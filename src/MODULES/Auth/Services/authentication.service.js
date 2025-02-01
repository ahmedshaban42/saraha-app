import  {usermodel}  from '../../../DB/models/user.model.js';
import { compareSync, hashSync } from 'bcrypt';
import { encryption } from '../../../utils/encryption.utils.js';
import { emitter} from '../../../Services/send-email.service.js';
import path from 'path'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid';
import { blacklistmodel } from '../../../DB/models/black_list_tokens_models.js';








export const signUpService=async (req,res)=>{
        const {username,password,confirmPassword,email,age,phone}=req.body

        const isEmailExist=await usermodel.findOne({email})
        if(isEmailExist){
            return res.status(409).json({message:'email is already exist'})
        }
        const hashpassword=hashSync(password,+process.env.SALT)
        const encryptionphone=await encryption({value:phone,secretkey:process.env.ENCRYPTED_KEY})
        const token =jwt.sign({email},
            process.env.JWT_SECRETKEY_EMAIL,
            {expiresIn:`${process.env.JWT_TOKEN_EXP_SIGNUP}`,jwtid:uuidv4()})

        const confirmEmailLink=`${req.protocol}://${req.headers.host}/auth/verify/${token}`
    
        emitter.emit('sendEmail',{
            to:email,
            subject:'verify your email',
            html:`<h1>verifay yoyr email</h1>
                <a href="${confirmEmailLink}">click to verify</a>`,
            attachments:[
                {
                    filename:'nodejs-cover.webp',
                    path:path.resolve('Assets/nodejs-cover.webp')
                },
                {
                    filename:'NodeJs Orientation.pdf',
                    path:path.resolve('Assets/nodejs-cover.webp')
                }
            ]
        })

        const user=await usermodel.create({username,password:hashpassword,email,age,phone:encryptionphone})
        if(!user){
            return res.status(500).json({message:'can not create user try agen'})
        }
        
        return res.status(201).json({message:'crate susseccfuly',user})

}


export const verifayEmail=async(req,res)=>{
        const {token}=req.params
        const decoded=jwt.verify(token,process.env.JWT_SECRETKEY_EMAIL)
        const user=await usermodel.findOneAndUpdate({
            $or:[
                {_id:decoded._id},
                {email:decoded.email}
            ]

        },{isEmailVreified:true},{new:true})
        if(!user){
            return res.status(500).json({message:'user not found'})
        }
    
        res.status(200).json({message:'verifay Email successfully'})

}


export const signInServise=async(req,res)=>{

        const {email,password}=req.body
        const user=await usermodel.findOne({email})
        if(!user){
            return res.status(409).json({message:'invalid email or password'})
        }
        const isPasswordExist=compareSync(password,user.password)
        if(!isPasswordExist){
            return res.status(409).json({message:'invalid email or password'})
        }

        const accesstoken=jwt.sign({_id:user._id,email:user.email},
            process.env.JWT_ACCESS_TOKEN_SECRETKEY_LOGIN, 
            {expiresIn:`${process.env.JWT_ACCESS_TOKEN_EXP_LOGIN}`,jwtid:uuidv4()})


        const refreshtoken=jwt.sign({_id:user._id,email:user.email},
            process.env.JWT_REFRESH_TOKEN_SECRETKEY_LOGIN, 
            {expiresIn:`${process.env.JWT_REFRESH_TOKEN_EXP_LOGIN}`,jwtid:uuidv4()})    

        return res.status(200).json({message:'user login successfully',accesstoken,refreshtoken})
}


export const refreshtoken=async(req,res)=>{
    
        const {refreshtoken}=req.headers
        const decodeddata=jwt.verify(refreshtoken,process.env.JWT_REFRESH_TOKEN_SECRETKEY_LOGIN)
        
        const isblacklistedtoken=await blacklistmodel.findOne({tokenid:decodeddata.jti})
        if(isblacklistedtoken){
            return res.status(409).json({message:'please login frist'})
        }

        const accesstoken=jwt.sign({_id:decodeddata._id,email:decodeddata.email},
            process.env.JWT_ACCESS_TOKEN_SECRETKEY_LOGIN, 
            {expiresIn:`${process.env.JWT_ACCESS_TOKEN_EXP_LOGIN}`,jwtid:uuidv4()})
        return res.status(200).json({message:'access token is',accesstoken})
    
}


export const signOutServise=async(req,res)=>{
    
        const {accesstoken,refreshtoken}=req.headers
        console.log(accesstoken,refreshtoken)

        const accesstokendata=jwt.verify(accesstoken,process.env.JWT_ACCESS_TOKEN_SECRETKEY_LOGIN)
        const refreshtokendata=jwt.verify(refreshtoken,process.env.JWT_REFRESH_TOKEN_SECRETKEY_LOGIN)
        
        const revocktoken=await blacklistmodel.insertMany([
            {
                tokenid:accesstokendata.jti,
                expirydata:accesstokendata.exp
            },
            {
                tokenid:refreshtokendata.jti,
                expirydata:refreshtokendata.exp
            }
        ])
        res.status(200).json({message:'logout successfully'})
}


export const forgetpassword=async(req,res)=>{
    
        const {email}=req.body
        const user=await usermodel.findOne({email})
        if(!user){
            return res.status(400).json({message:'user not found'})
        }
        const otp=uuidv4()
        emitter.emit('sendEmail',{
            to:user.email,
            subject:'reset your password',
            html:`<h1>otp is=> ${otp}</h1>`,
        })
        const hashotp=hashSync(otp,+process.env.SALT)

        user.otp=hashotp
        await user.save()

        res.status(200).json({message:'otp send seccessfuly'})
    

}

export const resetpasswoed=async(req,res)=>{

        const{email,otp,password,confirmPassword}=req.body
    const user=await usermodel.findOne({email})
    if(!user){
        return res.status(400).json({message:'user not found'})
    }
    if(!user.otp){
        return res.status(400).json({message:'plasse generate otp'})
    }
    
    const isotpmatched=compareSync(otp,user.otp)
    if(!isotpmatched){
        return res.status(400).json({message:'invalid otp'})
    }
    const hashpassword=hashSync(password,+process.env.SALT)
    await usermodel.updateOne({email},{password:hashpassword,$unset:{otp:""}})
    return res.status(200).json({message:'password reset successfully'})
    

}