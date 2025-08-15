import Joi from 'joi';
// const {object, string, number } = Joi;

export const validateRegister = body => {
    const registerSchema = Joi.object({
       name : Joi.string().min(2).max(50).pattern(/^[A-Za-z\s]+$/).required().messages({ 'string.empty': 'Name is required.', 'string.min': 'Name must be at least 2 characters.', 'string.max': 'Name must be at most 50 characters.', 'string.pattern.base': 'Name can only contain letters and spaces.' }),
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.'
      }),
        password: Joi.string().min(6).max(20).required().messages({ 'string.empty': 'Password is required', 'string.min': 'Password must be at least 6 characters long.', 'string.max': 'Password cannot exceed 20 characters.'})
    });
    return registerSchema.validate(body);
}

export const validateVerifyEmailBody = body => {
    const verifyEmailBodySchema = Joi.object({
      email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.'
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
    email: Joi.string().email({ tlds: { allow: false } }).min(3).required().messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.'
      }),
    password: Joi.string().min(6).max(20).required().messages({ 'string.empty': 'Password is required to Login', 'string.min': 'Password must be at least 6 characters long.', 'string.max': 'Password cannot exceed 20 characters.'}),
  });
  return loginSchema.validate(body);
}

export const validateSendVerificationCode = body => {
    const emailSchema = Joi.string().email({ tlds: { allow: false } }).min(3).required().messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.'
      })
    return emailSchema.validate(body);
}

export const validatePassword = body => {
    const pwdSchema = object({
        password: Joi.string().min(6).max(20).required().message({ 'string.empty': 'Password is required', 'string.min': 'Password must be at least 6 characters long.', 'string.max': 'Password cannot exceed 20 characters.'}),
    });
  return pwdSchema.validate(body);
}

export const validateChangePwdBody = body => {
    const changePwdSchema = Joi.object({
    oldPassword: Joi.string().min(6).max(20).required().message({ 'string.empty': 'Both current and new passwords are required', 'string.min': 'Password must be at least 6 characters long.', 'string.max': 'Password cannot exceed 20 characters.'}),
    newPassword: Joi.string().min(6).max(20).required().message({ 'string.empty': 'Both current and new passwords are required', 'string.min': 'Password must be at least 6 characters long.', 'string.max': 'Password cannot exceed 20 characters.'})
  });
  return changePwdSchema.validate(body);
}

export const validateForgetPasswordBody = body => {
  const forgetPwdSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).min(3).required().messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.'
      })
  });
  return forgetPwdSchema.validate(body);
}

export const validateResetPasswordBody = body => {
  const resetPwdSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).min(3).required().messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.'
      }),
    code: Joi.string().pattern(/^\d{6}$/).required().messages({
        'string.pattern.base': 'Code must be exactly 6 digits.',
        'string.empty': 'Code is required.'
      }),
    newPassword: Joi.string().min(6).max(20).required().message({ 
      'string.empty': 'Both current and new passwords are required', 
      'string.min': 'Password must be at least 6 characters long.', 
      'string.max': 'Password cannot exceed 20 characters.'
    })
  });
  return resetPwdSchema.validate(body) 
}