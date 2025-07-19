import { validateVerifyEmailBody } from '../../validators/authValidator.js';
import { validateCode } from '../../models/VerificationCode.js';
const verifyEmailCode = async(req, res) => {
    try {
        const { error } = validateVerifyEmailBody(req.body);
        if (error) return res.status(422).json({msg: error.details[0].message});
        const {email, code} = req.body;
        const result = await validateCode(email,code);
        console.log(result);
        res.status(200).json({msg: 'Email has been verified successfully'});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: 'Server Error'})
    }
}
export default verifyEmailCode;