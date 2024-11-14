const nodemailer = require("nodemailer"); 
require("dotenv").config();
const path = require("path");

const transporter = nodemailer.createTransport({
   service: 'gmail',
   host: "smtp.gmail.com",
   port: 587,
   secure: false, // true for port 465, false for other ports
   auth: {
     user: process.env.USER,
     pass: process.env.APP_PASSWORD,
   },
 });
 const otp = Math.floor(100000 + Math.random() * 900000);

 const mailOptions = {
   from: {
     name: "iWanderPH",
     address: process.env.USER
   },
   to: ["kimberlymaealipin@gmail.com"],
   subject: "Verify Your Email - iWanderPH",
   text: `Your iWanderPH verification code is: ${otp}`,  // for email clients that don't support HTML
   html: `
    <body>
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="cid:iwanderph-logo" style="width: 150px; height: auto;" alt="iWanderPH Logo">
        </div>
        <P style="font-size: 20px; font-weight: 600; text-align: center;" color: #333;>Welcome aboard wanderer!</p>
        <p style="font-size: 16px; color: #333; ">
          Hello! Thank you for signing up with iWanderPH. To complete your registration, please use the following verification code:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <p style="font-size: 20px; font-weight: 600; color: #074D4C;">${otp}</p>
        </div>
        <p style="font-size: 16px; color: #333;">
          Enter this code in the app to verify your email address. This code will expire in 10 minutes.
        </p>
        <p style="font-size: 14px; color: #777;">
          If you didn't request this, please ignore this email. Your account is still secure.
        </p>
        <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
          &copy; ${new Date().getFullYear()} iWanderPH. All rights reserved.
        </p>
      </div>
    </body>
   `,
   attachments: [
     {
       filename: "sample.png",
       path: path.join(__dirname, 'sample.png'), // Path to your logo file
       cid: 'iwanderph-logo' // Use Content-ID to reference the logo in the HTML
     }
   ]
 };

 const sendMail = async (transporter, mailOptions) => {
   try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent");
   } catch (error) {
      console.error(error);
   } 
}

sendMail(transporter, mailOptions);