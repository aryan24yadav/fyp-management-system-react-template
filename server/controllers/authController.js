import {asyncHandler} from "../middlewares/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/user.js";
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../services/emailServices.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplates.js";
import crypto from "crypto";

export const register = asyncHandler(async (req,res,next) => {
    const {name,email,password,role} = req.body;
    if(!name || !email || !password || !role){
        return next(new ErrorHandler("All fields are required",400));
    }
    let user = await User.findOne({ email });
    if(user){
        return next(new ErrorHandler("User already exists",400));
    }
    user = new User({name,email,password,role});
    await user.save();
    generateToken(user,201,"User registered successfully",res);
    // res.status(201).json({success: true, message:"User registered successfully"});
});
export const login = asyncHandler(async (req,res,next) => {
    const { email , password , role } = req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("All fields are required",400));
    }
    let user = await User.findOne({ email}).select("+password");
    if(!user){
        return next(new ErrorHandler("User not found",400));
    }
    if(user.role !== role){
        return next(new ErrorHandler("User role does not match",400));
    }
    if(!await user.comparePassword(password)){
        return next(new ErrorHandler("Invalid credentials",400));
    }
    generateToken(user,200,"User logged in successfully",res);
});
export const logout = asyncHandler(async (req,res,next) => {
    res.status(200).cookie("token","",{
        expires: new Date(Date.now()),
        httpOnly:true,
    }).json({success:true,message:"User logged out successfully"});
});
export const getUser = asyncHandler(async (req,res,next) => {
    const user = req.user;
    res.status(200).json({success:true,user});
});
export const forgotPassword = asyncHandler(async (req,res,next) => {
    const {email} = req.body;

    if(!email){
        return next(new ErrorHandler("Email is required",400));
    }

    const user = await User.findOne({ email });

    if(!user){
        return next(new ErrorHandler("User not found",404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const message = generateForgotPasswordEmailTemplate(user.name,resetPasswordUrl);

    await sendEmail({
        to:user.email,
        subject:"Forgot Password",
        message,
    });

    res.status(200).json({
        success:true,
        message:`email sent to ${user.email} successfully`
    });
});
export const resetPassword = asyncHandler(async (req,res,next) => {
    const {token} = req.params;
    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const {password} = req.body;
    if(!token || !password){
        return next(new ErrorHandler("All fields are required",400));
    }
    const user = await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}});
    if(!user){
        return next(new ErrorHandler("Invalid token",400));
    }
    if( !req.body.password !== !req.body.confirmPassword){
        return next(new ErrorHandler("Password and Confirm Password is not matched",400));
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    generateToken(user,200,"Password reset successfully",res);
});
export const updatePassword = asyncHandler(async (req,res,next) => {});
