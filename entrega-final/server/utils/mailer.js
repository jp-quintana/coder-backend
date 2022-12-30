const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_ADMIN, // generated ethereal user
    pass: process.env.EMAIL_STRING, // generated ethereal password
  },
});
