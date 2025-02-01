import { usermodel } from "../../../DB/models/user.model.js"
import { messageModel } from "../../../DB/models/messages.model.js"

export const  sendMessage=async(req,res)=>{
    const {body,ownerId}=req.body
    if (ownerId.length !== 24) {
        return res.status(409).json({message:'user id must be 24'}); 
    }

    if (!/^[A-Fa-f0-9]{24}$/.test(ownerId)) {
        return res.status(409).json({message:'user id not valid'})
    }
    const user=await usermodel.findById(ownerId)
    if(!user){
        return res.status(409).json({message:'can not find user'})
    }
    const message=await messageModel.create({
        body,
        ownerId
    })
    res.status(201).json({message:'message sent successfully'})
}

export const getmessages=async(req,res)=>{
    const message=await messageModel.find({}).
    populate(
        [
            {
                path:'ownerId',
                select:'-password'
            }
        ]
    )
    res.status(200).json({message:'messages is',data:message})
}

export const getusermessages=async(req,res)=>{

    const _id=  req.loggedinuser
    const message=await messageModel.find({ownerId:_id})
    res.status(200).json({message:'messages is',data:message})
}