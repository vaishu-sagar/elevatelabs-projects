require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const User = require('./models/User');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URI);

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const token = uuidv4();

  const user = new User({
    name,
    email,
    password,
    verificationToken: token
  });

  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const verificationLink = `http://localhost:3000/verify/${token}`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: "Verify Your Account",
    html: `<h2>Click below to verify</h2>
           <a href="${verificationLink}">Verify Now</a>`
  });

  res.send("Check your email to verify account");
});

app.get('/verify/:token', async (req, res) => {
  const user = await User.findOne({ verificationToken: req.params.token });

  if (!user) return res.send("Invalid Token");

  user.verified = true;
  user.verificationToken = null;
  await user.save();

  res.redirect('/dashboard.html');
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server running on 3000");
});

app.listen(3000, () => console.log("Server running on 3000"));