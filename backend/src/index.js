import express from "express"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDatabase } from "./config/database.config.js"

dotenv.config()
const PORT = process.env.PORT
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/message",messageRoutes)

connectDatabase().then(() => {
   app.listen(PORT, () => {
    console.log("✅ Server running on "+PORT)
    }) 
})
