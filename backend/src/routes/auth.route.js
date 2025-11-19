import express from "express"
import {signUp, logIn, logOut, updateProfile} from "../controllers/auth.controller.js"
const router = express.Router()

router.post("/signup",signUp)
router.post("/login",logIn)
router.post("/logout",logOut)


router.put("/update-profile",updateProfile)
export default router