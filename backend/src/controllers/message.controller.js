import Message from "../models/message.model.js";
import User from "../models/user.model.js"

export async function getUsersForSidebar(req,res) {
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id: {$ne:loggedInUserId}}).select("-password");
        res.stats(200).json(filteredUsers)
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}

export async function getMessages(req,res) {
    try {
        const {id:userToChatId} =req.params
        const myId=req.user._id

        const messages = await Message.find({
            $or:[
                {senderId:myId, receiverId:userToChatId},
                {senderId:userToChatId, receiverId:myId}
            ]
        })
        res.status(200).json(messages)

    } catch(error) {
        res.status(500).json({message:"Internal Server Error"})
    }
}

export async function sendMessages (req,res) {
    try {
        const {text, image} = req.body
        const {id: receiverId} = req.params
        const senderId=req.user._id
        let imageUrl
        if(image) {
            const uploadResponse=await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }
        const newMessage = new Message ({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save()
    } catch(error) {
        res.status(500).json({message: "Internal Server Error"})
    }
}