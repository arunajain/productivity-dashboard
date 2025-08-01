import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { validateRegister, validateLogin, validateVerifyEmailBody, validateChangePwdBody } from '../validators/authValidator.js';
import { findUserByEmail, createUser, updateUserSingleColumn, getUserById } from '../models/User.js';
import { createVerificationCode, validateCode, deleteCodes } from '../models/VerificationCode.js';
import generateRandomCode from '../utils/generateRandomCode.js';
import sendEmail from '../utils/sendEmail.js';

export const registerUser = async(req, res) => {
    try{
        const { error } = validateRegister(req.body); //uses obj destructuring
        if (error) return res.status(422).json({msg: error.details[0].message});

        let {name, email, password} = req.body; //uses destructuring
        const chkUserExist = await findUserByEmail(email);
        if(chkUserExist) return res.status(400).json({msg: 'User already exists with this email'});
        const [firstName, lastName] = name.trim().split(' ');
        name = (firstName?.slice(0,1).toUpperCase()) + (firstName?.slice(1)?.toLowerCase()) + (lastName ? ' ' + lastName.slice(0,1).toUpperCase() + lastName?.slice(1)?.toLowerCase() : '');
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await createUser(name, email, hashedPassword);
        const emailCode = generateRandomCode(6);
        console.log("Generated email code:", emailCode);
        const expiresAt = new Date(Date.now() + 15*60*1000);//15 mins
        console.log(expiresAt);
        await createVerificationCode(newUser.id, emailCode, expiresAt);
        sendEmail(email, name, emailCode,"register",req,res).catch(err => {
            console.error("Email failed:", err);
        });
        res.status(201).json({
            msg: 'Verification code sent to verify email.',
            newUser
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Server error' });
    }
    // const accessToken = signAccessToken(newUser.id);
    // console.log("accessToken", accessToken);
    
    // return res.status(200).json({
    //    newUser, msg: "You registered Successfully. Please verify your email to login", accessToken: accessToken
    // });
};

export const verifyEmailCode = async(req, res) => {
    try {
        const { error } = validateVerifyEmailBody(req.body);
        if (error) return res.status(422).json({msg: error.details[0].message});
        const {email, code} = req.body;
        const code_dtl = await validateCode(email,code);
        if(code_dtl){
            // console.log('result - ', code_dtl);
            //email verified so, delete entry from verification table and and set is_verified in user_table to true
            await deleteCodes(code_dtl.user_id);
            await updateUserSingleColumn('is_verified', true, code_dtl.user_id);
            return res.status(200).json({msg: 'Email verified successfully. You can now log in to your account.'});
        }
        else{
            return res.status(200).json({msg: 'The code you entered is incorrect or has expired.'});
        }
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({msg: 'Server Error'})
    }
}

export const login = async(req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if(error) return res.status(422).json({msg : error.details[0].message});
        const {email, password} = req.body;
        const user = await findUserByEmail(email);
        console.log('user - ', user)
        if(!user) res.status(401).json({success: false, msg: "User with that email does not exit", user: null});

        if(!user.is_verified) res.status(403).json({success: false, msg: "Please verify your email before logging in.", user: null});
        
        const isMatch = await bcrypt.compare(password, user.password_hash);
        console.log(isMatch)
        if(!isMatch) return res.status(400).json({success: false, msg: 'Invalid Password', user: null});
        
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {expiresIn : '2h'});
        const {id, name, email: emailId} = user;
        return res.status(200).json({success: true, msg: 'Login Successful', user: {id: id, name: name, email: emailId}, token});
    } catch (error) {
        console.log(error)
        return res.status(500).json({ msg: 'Server error' });
    }
}

export const changePassword = async(req, res) => {
    const { error } = validateChangePwdBody(req.body);
    if(error) return res.status(400).json({msg : error.details[0].message});

    const {currentPassword, newPassword} = req.body;
    try {
        const user = getUserById(req.user.id);
        const isMatch = await bcrypt.compare(currentPassword, user.password_hash);
        if(!isMatch) return res.status(400).json({msg: 'Incorrect current password'});

        const newPasswordHashed = await bcrypt.hash(newPassword, 10);
        await updateUserSingleColumn(password_hash, newPasswordHashed, req.user.id);
        return res.status(200).json({msg: 'Password changed successfully'})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg: "Server Error - while changing password"})
    }

}

export const forgotPassword = async (req, res) => {

};

export const resetPassword = async (req, res) => {

};