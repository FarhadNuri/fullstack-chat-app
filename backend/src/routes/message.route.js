import express from "express"

import { protectRoute } from "../middlewares/auth.middleware.js"
import { getUsersForSidebar, getMessages,sendMessages } from "../controllers/message.controller.js"
const router = express.Router()

router.get("/users",protectRoute, getUsersForSidebar)
router.get("/:id",getMessages)
router.post("/:id",sendMessages)

export default router