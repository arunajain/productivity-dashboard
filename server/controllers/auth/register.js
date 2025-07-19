import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validateRegister } from '../../validators/authValidator.js';
import { findUserByEmail, createUser } from '../../models/User.js';
import generateRandomCode from '../../utils/generateRandomCode.js';
import sendEmail from '../../utils/sendEmail.js';

export const registerUser = async(req, res) => {
    try{
        const { error } = validateRegister(req.body); //uses obj destructuring
        if (error) return res.status(422).json({msg: error.details[0].message});

        const {name, email, password} = req.body; //uses destructuring
        const chkUserExist = await findUserByEmail(email);
        if(chkUserExist) return res.status(400).json({msg: 'User already exists with this email'});
        const [firstName, lastName] = name.trim().split(' ');
        name = firstName.slice(0,1).toUpperCase() + firstName.slice(1).toLowerCase() + ' ' +  lastName.slice(0,1).toUpperCase() + lastName.slice(1).toLowerCase();
        const hashedPassword = await hash(password,10);
        const newUser = await createUser(name, email, hashedPassword);
        const emailCode = generateRandomCode(6);
        console.log("Generated email code:", emailCode);
        const expiresAt = new Date(Date.now + 15*60*1000);//15 mins
        await createVerificationCode(newUser.id, code, expiresAt);
        sendEmail(email,name, emailCode,"register",req,res).catch(err => {
            console.error("Email failed:", err);
        });
        res.status(201).json({
            msg: 'Verification code sent to verify email.',
            newUser
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
    // const accessToken = signAccessToken(newUser.id);
    // console.log("accessToken", accessToken);
    
    // return res.status(200).json({
    //    newUser, msg: "You registered Successfully. Please verify your email to login", accessToken: accessToken
    // });
};
