const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors"); 
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:4200', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json()); 

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
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).send("Email and OTP are required");
  }

  const mailOptions = {
    from: {
      name: "iWanderPH",
      address: process.env.USER
    },
    to: [email],
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
        cid: 'iwanderph-logo' 
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

app.post("/del-warn", (req, res) => {
  const { email, actualviolation } = req.body;

  if (!email || !actualviolation) {
    return res.status(400).send("Email and violation are required");
  }

  const mailOptions = {
    from: {
      name: "iWanderPH",
      address: process.env.USER,
    },
    to: email,
    subject: "Community Guidelines Violation - iWanderPH",
    html: `
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:iwanderph-logo" style="width: 150px; height: auto;" alt="iWanderPH Logo">
          </div>
          <h3 style="color: #074D4C; text-align: center;">Notice of Violation</h3>
          <p style="font-size: 16px; color: #333;">Dear User,</p>
          <p style="font-size: 16px; color: #333;">
            We are writing to inform you that a recent piece of content you shared on our platform has been flagged for violating our community guidelines. 
            Below are the details:
          </p>
          <ul style="font-size: 16px; color: #333;">
            <li><strong>Violation:</strong> ${actualviolation}</li>
            <li><strong>Action Taken:</strong> Content Deletion and Warning</li>
          </ul>
          <p style="font-size: 16px; color: #333;">
            At iWanderPH, we are committed to maintaining a safe and respectful community for all our users. Please take a moment to review our 
            <a href="https://docs.google.com/document/d/1l4WtEY6McJsOa3lv68-vExlaGfaRFLOaDYmumIbmrV8/edit?tab=t.0" style="color: #074D4C; text-decoration: none;">Community Guidelines</a> to avoid future violations.
          </p>
          <p style="font-size: 14px; color: #777;">
            If you believe this was done in error or have any questions, please feel free to contact us at 
            <a href="mailto:support@iwanderph.com" style="color: #074D4C; text-decoration: none;">support@iwanderph.com</a>.
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
        path: path.join(__dirname, 'sample.png'),
        cid: 'iwanderph-logo',
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Failed to send email");
    }
    res.status(200).send("Email sent successfully");
  });
});


app.post("/suspend-user", (req, res) => {
  const { email, actualviolation } = req.body;

  if (!email || !actualviolation) {
    return res.status(400).send("Email and violation are required");
  }

  const mailOptions = {
    from: {
      name: "iWanderPH",
      address: process.env.USER,
    },
    to: email,
    subject: "Account Suspension Notice - iWanderPH",
    html: `
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:iwanderph-logo" style="width: 150px; height: auto;" alt="iWanderPH Logo">
          </div>
          <h3 style="color: #D32F2F; text-align: center;">Account Suspension Notice</h3>
          <p style="font-size: 16px; color: #333;">Dear User,</p>
          <p style="font-size: 16px; color: #333;">
            We regret to inform you that your account has been suspended for a period of one week due to a violation of our community guidelines.  
            Below are the details of the violation:
          </p>
          <ul style="font-size: 16px; color: #333;">
            <li><strong>Violation:</strong> ${actualviolation}</li>
            <li><strong>Action Taken:</strong> Account Suspension (1 Week)</li>
          </ul>
          <p style="font-size: 16px; color: #333;">
            During this time, you will not be able to access your account or use iWanderPH services. The suspension will be lifted automatically after the specified period, provided no further violations occur.
          </p>
          <p style="font-size: 16px; color: #333;">
            Please review our 
            <a href="https://docs.google.com/document/d/1l4WtEY6McJsOa3lv68-vExlaGfaRFLOaDYmumIbmrV8/edit?tab=t.0" style="color: #074D4C; text-decoration: none;">Community Guidelines</a> 
            to understand our rules and ensure compliance in the future.
          </p>
          <p style="font-size: 14px; color: #777;">
            If you believe this action was taken in error or have questions, feel free to contact us at 
            <a href="mailto:support@iwanderph.com" style="color: #074D4C; text-decoration: none;">support@iwanderph.com</a>.
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
        path: path.join(__dirname, 'sample.png'),
        cid: 'iwanderph-logo',
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Failed to send email");
    }
    res.status(200).send("Suspension email sent successfully");
  });
});

app.post("/ban-user", (req, res) => {
  const { email, actualviolation } = req.body;

  if (!email || !actualviolation) {
    return res.status(400).send("Email and violation are required");
  }

  const mailOptions = {
    from: {
      name: "iWanderPH",
      address: process.env.USER,
    },
    to: email,
    subject: "Account Ban Notice - iWanderPH",
    html: `
      <body>
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="cid:iwanderph-logo" style="width: 150px; height: auto;" alt="iWanderPH Logo">
          </div>
          <h3 style="color: #B71C1C; text-align: center;">Account Ban Notice</h3>
          <p style="font-size: 16px; color: #333;">Dear User,</p>
          <p style="font-size: 16px; color: #333;">
            We regret to inform you that your account has been permanently banned due to a serious or repeated violation of our community guidelines. Below are the details of the violation:
          </p>
          <ul style="font-size: 16px; color: #333;">
            <li><strong>Violation:</strong> ${actualviolation}</li>
            <li><strong>Action Taken:</strong> Permanent Account Ban</li>
          </ul>
          <p style="font-size: 16px; color: #333;">
            At iWanderPH, we are committed to maintaining a safe and respectful community for all users. Due to the severity or recurrence of this violation, access to your account has been permanently revoked, and you will no longer be able to use iWanderPH services.
          </p>
          <p style="font-size: 16px; color: #333;">
            We understand this may be disappointing, but this action is necessary to uphold the integrity and safety of our platform. 
          </p>
          <p style="font-size: 14px; color: #777;">
            If you believe this decision was made in error, you may contact us at 
            <a href="mailto:support@iwanderph.com" style="color: #074D4C; text-decoration: none;">support@iwanderph.com</a>. However, please note that bans are rarely reversed and are only reviewed under exceptional circumstances.
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
        path: path.join(__dirname, 'sample.png'),
        cid: 'iwanderph-logo',
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send("Failed to send email");
    }
    res.status(200).send("Ban email sent successfully");
  });
});



app.listen(port, () => {
  console.log(`Mailer service running locally at http://localhost:${port}`);
});
