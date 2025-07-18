import nodemailer from 'nodemailer';

export default async (email, name, confirmCode, type, req, res) => {
  new Promise(async (resolve, reject) => {
    if (!email || !confirmCode) {
      return res.status(400).send(errorHelper('00005', req)).end();
    }
    console.log(confirmCode);
    let body = '';
    if (type == 'register') {
      body = `Welcome ${name}!\r\n\r\nHere is your confirm code: ${confirmCode}`;
    } else {
      body = `Here is your confirm code: ${confirmCode}`;
    }
    
    let smtp = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'personalproject1691@gmail.com',
      pass: 'AppPassword', // Use App Password, unable to get because of issue at google not sending code via sms
    },
  });

    const emailInfo = {
      from: 'personalproject1691@gmail.com',
      to: email,
      subject: 'Verification Code',
      text: body
    };

    try {
      await smtp.sendMail(emailInfo);
      return resolve('Success');
    } catch (err) {
      return reject(err);
    }
  });
};
