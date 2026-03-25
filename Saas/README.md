# 🚀 SaaS-Style Landing Page with Sign-Up Workflow

## 📌 Project Overview
This project is a SaaS-style landing page with a complete user registration and email verification system. Users can sign up using their email, receive a verification link, and access a dashboard after successful verification.

## ✨ Features
- Modern SaaS Landing Page UI
- User Registration Form
- Email Verification using Nodemailer
- MongoDB Database Integration
- Secure Environment Variables (.env)
- Dashboard Page after Verification

## 🛠️ Technologies Used
- HTML
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- Nodemailer
- dotenv

## ⚙️ How to Run This Project

### 1️⃣ Install Dependencies
npm install

### 2️⃣ Create `.env` File
MONGO_URI=mongodb://127.0.0.1:27017/saasApp  
EMAIL=yourgmail@gmail.com  
PASSWORD=your_gmail_app_password  

### 3️⃣ Start Server
node server.js

Server will run on:  
http://localhost:3000


## 📂 Project Structure
SAAS/  
│-- public/  
│   └── index.html  
│-- models/  
│-- views/  
│-- server.js  
│-- .env  

---

## 📧 Workflow
1. User registers  
2. Verification email is sent  
3. User clicks verification link  
4. Account gets verified  
5. Dashboard opens  
