import { validateVerifyEmailBody } from '../../validators/authValidator.js';
import { validateCode, deleteCodes } from '../../models/VerificationCode.js';
import { updateUserSingleColumn } from '../../models/User.js';

const verifyEmailCode = async(req, res) => {
    try {
        const { error } = validateVerifyEmailBody(req.body);
        if (error) return res.status(422).json({msg: error.details[0].message});
        const {email, code} = req.body;
        const code_dtl = await validateCode(email,code);
        console.log(result);
        if(code_dtl){
            console.log('result - ', code_dtl);
            //email verified so, delete entry from verification table and and set is_verified in user_table to true
            await deleteCodes(code_dtl.user_id);
            await updateUserSingleColumn(is_verified, true, code_dtl.user_id);
            res.status(200).json({msg: 'Email verified successfully. You can now log in to your account.'});
        }
        else{
            res.status(200).json({msg: 'The code you entered is incorrect or has expired.'});
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: 'Server Error'})
    }
}
export default verifyEmailCode;