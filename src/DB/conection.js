//simple conection use drive mongo  

// import {MongoClient}from 'mongodb'
// const client=new MongoClient('mongodb://localhost:27017')
// export const db =client.db('saraha-app')



// export const connection=async()=>{
//     try{
//         await client.connect();
//         console.log('DB CONNECTED')

//     }catch(error){
//         console.log('DB connection error',error)
//     }
// }




import mongoose from "mongoose";


export const connection =async()=>{
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log ('DB CONNECTED')

    }catch(error){
        console.log ('errer in DB connection',error)
    }
}





