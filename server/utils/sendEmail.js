import nodemailer from 'nodemailer';

export default async (email, name, confirmCode, type, req, res) => {
    const body = type === 'register'? `Welcome ${name}!\r\n\r\nHere is your confirm code: ${confirmCode}` : `Here is your confirm code: ${confirmCode}`;
    let smtp = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use App Password, unable to get because of issue at google not sending code via sms
        },
    });

    const emailInfo = {
      from: 'personalproject1691@gmail.com',
      to: email,
      subject: 'Verification Code',
      text: body
    };
    return smtp.sendMail(emailInfo);
};
