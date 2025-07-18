const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validateRegister} = require('../../validators/authValidator');
const { findUserByEmail, createUser } = require('../../models/User');
import generateRandomCode from '../../utils/generetaRandomCode';

const regiterUser = async(req, res) => {
    const { error } = validateRegister(req.body);
    
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
        if(chkUserExist){
            res.status(400).json({msg: 'User already exists with this email'});
        }
        const [firstName, lastName] = name.trim().split(' ');
        name = firstName.slice(0,1).toUpperCase() + firstName.slice(1).toLowerCase() + ' ' +  lastName.slice(0,1).toUpperCase() + lastName.slice(1).toLowerCase();
        const hashedPassword = await bcrypt.hash(password,10);
        const emailCode = generateRandomCode(4);
        console.log("Generated email code:", emailCode);
        // await sendCodeToEmail(email,name, emailCode,"register",req,res);
        let newUser;
        try{
            newUser = await createUser(name, email, hashedPassword);
        } 
        catch(err){
            console.log(`Register User - ${err.message}`);
            res.status(500).json({ msg: 'Server Error while registering user'});
        }

        const confirmCodeToken = signConfirmCodeToken(user._id, emailCode);
        console.log("confirmCodeToken", confirmCodeToken);
        // logger("00035", user._id, getText("en", "00035"), "Info", req);

        
        res.cookie('confirmCodeToken', confirmCodeToken, {
            httpOnly: true,
            secure: false, // Set to true in production with HTTPS
            sameSite: 'Lax', // Or 'None' if frontend and backend are on different domains and you use HTTPS
        });
        
        return res.status(200).json({
           newUser, msg: "You registered Successfully", confirmToken: confirmCodeToken
        });

        // const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        //     res.status(201).json({
        //         token,
        //         user: {
        //             id: newUser.id,
        //             name: newUser.name,
        //             email: newUser.email
        //         }
        //     });
};