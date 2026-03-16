import jwt from "jsonwebtoken";
import { validationSignUp } from "../config/validation.js";
import User from "../model/user.js";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;
if(!JWT_SECRET){
    throw new Error("JWT Secret is required!");
}
export const registerUser = async(req,res)=>{
    
    try{
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.status(400).json({
                message:"All fields required!"
            })
        }
        const notValid = validationSignUp(req.body);
        if(notValid){
            return res.status(400).json({
                message:notValid
            })
        }

        const user = await User.findOne({email}).select("-password");
        if(user){
            res.status(409).json({
                message:"User already exists!"
            })
        }
        const hashedPassowrd = await bcrypt.hash(password,10);
        const newUser = await User.create({
            name,email,password:hashedPassowrd
        });

        const token = jwt.sign({id:newUser._id},JWT_SECRET,{expiresIn:'1h'});
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        // req.session.userId = newUser._id;



        return res.status(200).json({
            message:"Sign Up Successfull!",
            data:{
                id:newUser._id,name:newUser.name,email:newUser.email
            }
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Sign Up error is "+err
        })
    }
};


export const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message:"All fields required!"
            })
        }

        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({
                message:"Invalid Credentials!"
            })
        }
        const isPassword = await bcrypt.compare(password,user.password);
        if(!isPassword){
            res.status(401).json({
                message:"Invalid Credentials!"
            })

        }

        const token = jwt.sign({id:user._id},JWT_SECRET,{expiresIn:'1h'});
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        // req.session.userId = user._id;


        return res.status(200).json({
            message:"Login Successfull!",
            data:{
                id:user._id,name:user.name,email:user.email
            }
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Login error is "+err
        })
    }
};

export const logoutUser = async(req,res)=>{
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: false
        });
        return res.status(200).json({
            message:"Logout Successfull!"
        })
    }
    catch(err){
        return res.status(500).json({
            message:"Logout error is " + err
        })
    }
}


export const userCheck = async(req,res)=>{
    try{
        const {userId} = req
        // const {userId} = req.session;
        if(!userId){
            return res.status(401).json({
                message:"Unauthorized user!"
            })
        }
        const user = await User.findById(userId).select("-password");
        if(!user){
            return res.status(404).json({
                message:"User doesn't exist!"
            })

        }
        return res.status(200).json({
            message:"User is authenticated",
            data:user
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:"User check err is "+err
        })
    }
}