import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export async function protectRoute(req,res,next) {
    try {
        const token = req.cookie.jwt
        if(!token) {
            return res.status(400).json({success:false, message: " invalid token credential" })
        }
        
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}