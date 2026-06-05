import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true,
        maxlength:[30,"Name cannot be more than 30 characters"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:[8,"Password must be at least 8 characters long"],
        select:false
    },
    role:{
        type:String,
        default:"Student",
        enum:["Student","Teacher","Admin"],
    },
    resetPasswordToken:{
        type:String,
        select:false
    },
    resetPasswordExpire:{
        type:Date,
        select:false
    },
    department:{
        type:String,
        // required:[true,"Department is required"],
        trim:true,
        maxlength:[30,"Department cannot be more than 30 characters"]
    },
    experties:{
        type:[String],
        default:[],
    },
    maxStudents:{
        type:Number,
        default:10,
        min:[1,"Min 1 student is required"],
    },
    assignedStudents:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    }],
    supervisor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null,
    },
    projects:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Project",
        default:null,
    },
},{timestamps:true})

userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return; 
    }
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
}
userSchema.methods.generateToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRE});
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

export const User = mongoose.model("User",userSchema);