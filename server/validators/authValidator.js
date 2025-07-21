import Joi from 'joi';
// const {object, string, number } = Joi;

export const validateRegister = body => {
    const registerSchema = Joi.object({
       name : Joi.string().min(2).max(50).pattern(/^[A-Za-z\s]+$/).required().messages({ 'string.empty': 'Name is required.', 'string.min': 'Name must be at least 2 characters.', 'string.max': 'Name must be at most 50 characters.', 'string.pattern.base': 'Name can only contain letters and spaces.' }),
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Invalid email format.',
        'any.required': 'Email is required.'
      }),
        password: Joi.string().min(6).max(20).required()
    });
    return registerSchema.validate(body);
}

export const validateVerifyEmailBody = body => {
    const verifyEmailBodySchema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Invalid email format.',
        'any.required': 'Email is required.'
      }),
      code: Joi.string().pattern(/^\d{6}$/).required().messages({
        'string.pattern.base': 'Code must be exactly 6 digits.',
        'string.empty': 'Code is required.'
      })
    });
    return verifyEmailBodySchema.validate(body);
}

export const validateLogin = body => {
  const loginSchema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(6).max(20).required(),
  });
  return loginSchema.validate(body);
}

export const validateSendVerificationCode = body => {
    const emailSchema = Joi.object({
        email: Joi.string().email().min(3).required(),
    });
    return emailSchema.validate(body);
}

export const validatePassword = body => {
    const pwdSchema = object({
        password: Joi.string().min(6).max(20).required(),
    });
  return pwdSchema.validate(body);
}

export const validateChangePwd = body => {
    const changePwdSchema = Joi.object({
    oldPassword: Joi.string().min(6).max(20).required(),
    newPassword: Joi.string().min(6).max(20).required(),
  });
  return changePwdSchema.validate(body);
}

export default {validateRegister, validateVerifyEmailBody, validateLogin}
