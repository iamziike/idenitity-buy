require('dotenv').config();

const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMessage = async (to, text, subject = 'Hello') => {
  const message = {
    to,
    from: process.env.SENDGRID_EMAIL,
    subject,
    text,
    // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };

  sgMail
    .send(message)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendMessage;
