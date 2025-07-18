const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validateRegister} = require('../../validators/authValidator');
const { findUserByEmail, createUser } = require('../../models/User');
import generateRandomCode from '../../utils/generetaRandomCode';
import sendEmail from '../../utils/sendEmail';

const registerUser = async(req, res) => {
    try{
        const { error } = validateRegister(req.body); //uses obj destructuring
        if (error) {
            console.log(error);
            let msg = '';
            if (error.details[0].message.includes("email")) msg='Please provide a valid email';
            else if (error.details[0].message.includes("password")) msg = 'Please provide a password that is longer than 6 letters and shorter than 20 letters.';
            else if (error.details[0].message.includes("name")) msg='Please provide a name that is longer than 3 letters and shorter than 30 letters.';
            return res.status(422).json({msg: msg});
        }

        const {name, email, password} = req.body; //uses destructuring
        const chkUserExist = await findUserByEmail(email);
        if(chkUserExist) return res.status(400).json({msg: 'User already exists with this email'});
        const [firstName, lastName] = name.trim().split(' ');
        name = firstName.slice(0,1).toUpperCase() + firstName.slice(1).toLowerCase() + ' ' +  lastName.slice(0,1).toUpperCase() + lastName.slice(1).toLowerCase();
        const hashedPassword = await bcrypt.hash(password,10);
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

module.exports = registerUser