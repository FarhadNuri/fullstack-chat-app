import { generateToken } from "../lib/utils.lib.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export async function signUp(req,res) {

    const{email,password,fullname} = req.body
    if(!email || !password || !fullname) {
        return res.status(400).json({success:false,message: "provide all fields"})
    }

    try {
        if(password.length<6) {
            return res.status(400).json({success:false, message:"password length is small"})
        }
        const existingUser = await User.findOne({email})
        if(existingUser) {
            return res.status(400).json({success: false, message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullname:fullname,
            email:email,
            password:hashedPassword
        })
        if(newUser) {
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                email:newUser.email
            })
        } else {
            res.status(400).json({success:false, message: "Invalid credentials"})
        }
    } catch (error) {
        res.status(500).json({success:false,messag: "internal server error"})
    }
}
export async function logIn(req,res) {
    const {email,password} = req.body
    if(!email || !password) {
        return res.status(400).json({success:false,message:"provide all fields"})
    }
    try {
        const currUser = await User.findOne({email})
        if(!currUser) {
            return res.status(400).json({success:false,message:"invalid credentials"})
        }
        const correctPassword = await bcrypt.compare(password,currUser.password)

        if(!correctPassword) {
            return res.status(400).json({success:false,message:"invalid credentials"})
        }

        generateToken(currUser._id,res)
        res.status(200).json({
            _id: currUser._id,
            fullname:currUser.fullname,
            email: currUser.email,
            profilePic: currUser.profilePic,
            message: "login successfull"
        })
    } catch (error) {
        res.status(500).json({success:false,message:"internal server error"})
    }
}
export async function logOut(req,res) {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({success:true,message:"Logged out successfully"})
    } catch (error) {
        res.status(500).json({success:false,message:"internal server error"})
    }
}

export async function updateProfile(req,res) {
        
}