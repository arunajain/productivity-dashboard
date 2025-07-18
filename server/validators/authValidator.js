import Joi from 'joi';

const validateRegister = body => {
    const registerSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().min(3).required(),
        password: Joi.string().min(6).max(20).required()
    });
    return registerSchema.validate(body);
}

const validateLogin = body => {
  const loginSchema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).max(20).required(),
  });
  return schema.validate(body);
}

const validateSendVerificationCode = body => {
    const emailSchema = Joi.object({
        email: Joi.string().email().min(3).required(),
    });
    return emailSchema.validate(body);
}

const validatePassword = body => {
    const pwdSchema = Joi.object({
        password: Joi.string().min(6).max(20).required(),
    });
  return pwdSchema.validate(body);
}

const validateChangePwd = body => {
    const changePwdSchema = Joi.object({
    oldPassword: Joi.string().min(6).max(20).required(),
    newPassword: Joi.string().min(6).max(20).required(),
  });
  return changePwdSchema.validate(body);
}

module.exports = {validateRegister, validateLogin}
