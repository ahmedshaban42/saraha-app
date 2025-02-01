// import { db } from "../conection.js";

// const usermodel=db.collection('user')
// usermodel.createIndex({email:1},{unique:true,name:'index-user-unique'})


// export default usermodel

import mongoose from "mongoose";
import { systemrRoles } from "../../constants/constants.js";
//const { Schema } = mongoose;

const userschema=new mongoose.Schema({
    username:{
        type:String,
        require:[true,'user name is require'],
        lowercase:true,
        trim:true,
        unique:[true,'username is taken'],
        minLength:[3,'name must be grater then 3 '],
        maxlength:[20,'name must be less than 20']
    },
    email:{
        type:String,
        require:[true,'email is require'],
        unique:[true,'email is already taken'],
    },
    password:{
        type:String,
        require:[true,'password is require'],
    },
    phone:{
        type:String,
        require:[true,'phone number is require'],
    },
    age:{
        type:Number,
        require:[true,'age is require'],
        min:[18,'age must be grater then 18'],
        Max:[80,'age must be less then 80']
    },
    profileImage:String,
    isDeleted:{
        type:Boolean,
        default:false
    },
    isEmailVreified:{
        type:Boolean,
        default:false
    },
    otp:String,
    roles:{
        type:String,
        default:systemrRoles.User,
        enum:Object.values(systemrRoles)
    }

},
{timestamps:true})

export const usermodel=mongoose.model.user||mongoose.model('user',userschema)