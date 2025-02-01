import { compareSync, hashSync } from "bcrypt";
import { blacklistmodel } from "../../../DB/models/black_list_tokens_models.js";
import { usermodel } from "../../../DB/models/user.model.js";
import { encryption,decryption } from "../../../utils/encryption.utils.js";
import jwt from 'jsonwebtoken'
import { emitter } from "../../../Services/send-email.service.js";
import { v4 as uuidv4 } from 'uuid';
import asyncHandler from "express-async-handler";


export const getuserdata=asyncHandler(
    async(req,res)=>{
        const{_id}=req.loggedinuser
        const user =await usermodel.findById(_id)
        if(!user){
            return res.status(409).json({message:'user not found'})
        }
        user.phone=await decryption({cipher:user.phone,secretkey:process.env.ENCRYPTED_KEY})
        return res.status(200).json({message:'user is',user})
}
)
export const updatepassword=async(req,res)=>{
    try{
        const {_id}=req.loggedinuser

        const {oldPassword,newPasswoed,confirmPassword}=req.body
        if(newPasswoed!==confirmPassword){
            return res.status(409).json({message:'new passwoed and confirm password is not matches'})
        }

        const user=await usermodel.findById(_id)
        if(!user){
            return res.status(409).json({message:'user not found'})
        }

        const ispasswordMatche=compareSync(oldPassword,user.password)
        if(!ispasswordMatche){
            return res.status(409).json({message:'invalid password'})
        }

        const hashnewpasswoed=hashSync(newPasswoed,+process.env.SALT)
        user.password=hashnewpasswoed
        await user.save()

        await blacklistmodel.create( req.userToken)

        return res.status(200).json({message:'updateed password successfully '})
    }catch(error){
        console.log('internal error',error)
        res.status(500).json({message:'internal error'})
    }


}




export const updateProfile=async(req,res)=>{
    try{
        const {_id}=req.loggedinuser
        const {username,phone,email,age}=req.body
        const user=await usermodel.findById(_id)
        if(!user){
            return res.status(409).json({message:'user not found'})
        }

        if(username) user.username=username
        if(phone) user.phone=hashSync(phone,+process.env.SALT)
        if(age) user.age=age
        if(email){
            const isemailfound=await usermodel.findOne({email})
            if(isemailfound){
                return res.status(409).json({message:'email already exist'})
            }

            const token =jwt.sign({_id:user._id},
                process.env.JWT_SECRETKEY_EMAIL,
                {expiresIn:`${process.env.JWT_TOKEN_EXP_SIGNUP}`,
                jwtid:uuidv4()})
            
            const confirmEmailLink=`${req.protocol}://${req.headers.host}/auth/verify/${token}`
            emitter.emit('sendEmail',{
                to:email,
                subject:'verify your email',
                html:`<h1>verifay yoyr email</h1>
                    <a href="${confirmEmailLink}">click to verify</a>`
            })
            user.email=email
            user.isEmailVreified=false
        }
        await user.save()
        return res.status(200).json({message:'profile update susseccfully'})

    }catch(error){
        console.log('internal error',error)
        res.status(500).json({message:'internal error'})
    }
}