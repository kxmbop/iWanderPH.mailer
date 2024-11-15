const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());  // To handle JSON body

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

app.post("/send-otp", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP

  const mailOptions = {
    from: {
      name: "iWanderPH",
      address: process.env.USER
    },
    to: [email], // Send OTP to the provided email
    subject: "Verify Your Email - iWanderPH",
    text: `Your iWanderPH verification code is: ${otp}`, 
    html: `
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:iwanderph-logo" style="width: 150px; height: auto;" alt="iWanderPH Logo">
          </div>
          <h3 style="color: #074D4C; text-align: center;">Welcome aboard Wanderer!</h3>
          <p style="font-size: 16px; color: #333;">Hello! Thank you for signing up with iWanderPH. To complete your registration, please use the following verification code:</p>
          <div style="text-align: center; margin: 20px 0;">
            <p style="font-size: 20px; font-weight: 600; color: #074D4C;">${otp}</p>
          </div>
          <p style="font-size: 16px; color: #333;">Enter this code in the app to verify your email address. This code will expire in 10 minutes.</p>
          <p style="font-size: 14px; color: #777;">If you didn't request this, please ignore this email. Your account is still secure.</p>
          <p style="font-size: 14px; color: #777; text-align: center; margin-top: 20px;">
            &copy; ${new Date().getFullYear()} iWanderPH. All rights reserved.
          </p>
        </div>
      </body>
    `,
    attachments: [
      {
        filename: "sample.png",
        path: path.join(__dirname, 'sample.png'), 
        cid: 'iwanderph-logo' // Content ID for inline image
      }
    ]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Failed to send OTP");
    }
    res.status(200).send("OTP sent successfully");
  });
});

app.listen(port, () => {
  console.log(`Mailer service listening at http://localhost:${port}`);
});
