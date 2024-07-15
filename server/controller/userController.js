import Task from '../models/taskModel.js';
import Leave from '../models/leaveModel.js';
import Work from '../models/workModel.js';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';
import  Token from "../models/token.js";
import bcrypt from "bcryptjs";
const clientURL = process.env.CLIENT_URL;
import { Resend } from "resend";
import { resetTemplate } from '../utils/email/resetTemplate.js';



// Task Controller
const setTask = asyncHandler(async (req, res) => {
    try {
        const {
            name,
            email,
            checkinTime,
            checkoutTime,
            challenges,
            status,
            monitoredBy,
            description
        } = req.body;

        const taskData = {
            name,
            email,
            checkinTime,
            checkoutTime,
            challenges,
            status,
            monitoredBy,
            description,
        };

        const newTask = await Task.create(taskData);

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Leave Controller
const setLeave = asyncHandler(async (req, res) => {
    try {
        const { fromDate, toDate, purpose, status, email } = req.body;
        const userId = req.user._id; // Assuming req.user contains the authenticated user

        // Check if user has more than 2 leaves in the current month
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        const leaveCount = await Leave.countDocuments({
            userId: new mongoose.Types.ObjectId(userId),
            fromDate: { $gte: startOfMonth, $lte: endOfMonth }
        });

        if (leaveCount >= 2) {
            return res.status(400).json({ message: "Please mail to lead/admin." });
        }

        const leaveData = {
            userId,
            fromDate,
            toDate,
            purpose,
            status,
            email,
            requestDate: new Date() // Set the request date
        };

        const newLeave = await Leave.create(leaveData);

        res.status(201).json(newLeave);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// const requestPasswordReset = asyncHandler(async(req,res)=>{
//     const {email} = req.body;
//     const user = await UserModel.findOne({email});
  
//     const resend = new Resend(process.env.RESEND_KEY);
  
//     if(!user){
//       res.status(401);
//       throw new Error("User doesn't exist");
//     }
  
//     let token = await Token.findOne({ userId: user._id });
//     if (token) await token.deleteOne();
  
//     let resetToken = generateToken(user._id);
//     const salt = await bcrypt.genSalt();
//     const hash = await bcrypt.hash(resetToken, Number(salt));
  
//     await new Token({
//       userId: user._id,
//       token: hash,
//       createdAt: Date.now(),
//     }).save();
  
//     const link = `${clientURL}new-password?token=${resetToken}&id=${user._id}`;
//     // sendEmail(
//     //   user.email,
//     //   'Password Reset Request',
//     //   {
//     //     name : user.name,
//     //     link,
//     //   },
//     //   resetTemplate(user.name,link)
//     // );
//     try{
//       const data = await resend.emails.send({
//         from: 'MessAdmin@resend.dev',
//         to: user.email,
//         subject: 'Password Reset Request',
//         html: resetTemplate(user.name,link)
//       });
//     }catch(error){
//       console.log(error);
//     }
//     return res.json({link});
//   });
  
//   const resetPassword = asyncHandler(async(req,res)=>{
//     const {userId, token, password} = req.body;
//     let passwordResetToken = await Token.findOne({ userId });
  
//     if (!passwordResetToken) {
//       res.status(401);
//       throw new Error("Invalid or expired password reset token");
//     }
  
//     // console.log(passwordResetToken.token, token);
  
//     const isValid = await bcrypt.compare(token, passwordResetToken.token);
  
//     if (!isValid) {
//       res.status(401);
//       throw new Error("Invalid or expired password reset token");
//     }
  
//     const salt = await bcrypt.genSalt();
//     const hash = await bcrypt.hash(password, Number(salt));
  
//     await UserModel.updateOne(
//       { _id: userId },
//       { $set: { password: hash } },
//       { new: true }
//     );
  
//     const user = await UserModel.findById({ _id: userId });
  
//     await passwordResetToken.deleteOne();
//     return res.status(200).json({ message: "Password reset was successful" });
//   });

const getUserLeaves = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user contains the authenticated user

        const leaves = await Leave.find({ userId });

        res.status(200).json(leaves);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


const getUserWork = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id; // Assuming req.user contains the authenticated user

        const leaves = await Work.find({ userId });

        res.status(200).json(leaves);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

 const forgetPassword = async (req, res) => {
    try {
      // Find the user by email
      const user = await User.findOne({ mail: req.body.email });
  
      // If user not found, send error message
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
  
      // Generate a unique JWT token for the user that contains the user's id
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {expiresIn: "10m",});
  
      // Send the token to the user's email
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD_APP_EMAIL,
        },
      });
  
      // Email configuration
      const mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: "Reset Password",
        html: `<h1>Reset Your Password</h1>
      <p>Click on the following link to reset your password:</p>
      <a href="http://localhost:5173/reset-password/${token}">http://localhost:5173/reset-password/${token}</a>
      <p>The link will expire in 10 minutes.</p>
      <p>If you didn't request a password reset, please ignore this email.</p>`,
      };
  
      // Send the email
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).send({ message: err.message });
        }
        res.status(200).send({ message: "Email sent" });
      });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  };

const resetPassword = async (req, res) => {
    try {
      // Verify the token sent by the user
      const decodedToken = jwt.verify(
        req.params.token,
        process.env.JWT_SECRET_KEY
      );
  
      // If the token is invalid, return an error
      if (!decodedToken) {
        return res.status(401).send({ message: "Invalid token" });
      }
  
      // find the user with the id from the token
      const user = await User.findOne({ _id: decodedToken.userId });
      if (!user) {
        return res.status(401).send({ message: "no user found" });
      }
      
      // Hash the new password
      const salt = await bycrypt.genSalt(10);
      req.body.newPassword = await bycrypt.hash(req.body.newPassword, salt);
  
      // Update user's password, clear reset token and expiration time
      user.password = req.body.newPassword;
      await user.save();
  
      // Send success response
      res.status(200).send({ message: "Password updated" });
    } catch (err) {
      // Send error response if any error occurs
      res.status(500).send({ message: err.message });
    }
  };

export { setTask, setLeave ,getUserLeaves , getUserWork , forgetPassword , resetPassword};
