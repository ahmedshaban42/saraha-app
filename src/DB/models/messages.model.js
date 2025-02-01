import mongoose from "mongoose";

const messagesschema=new mongoose.Schema({
    body:{
        type:String,
        require:true
    },
    ownerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    }
},
{timestamps:true}
)

export const messageModel=mongoose.model.messages||mongoose.model('messages',messagesschema)