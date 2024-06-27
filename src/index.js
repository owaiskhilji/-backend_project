
            // Database connect krnek 2 do treeke h (phla ye h)
// require('dotenv').config()
// // import mongoose from "mongoose";
// // import { DB_NAME } from "./constants.js";
// // import express from "express"
// const mongoose =require("mongoose")
// // const DB_NAME = require("./constants.js")
//  const DB_NAME = "metube"
// const express = require("express")
// const app = express()
// const PORT = process.env.PORT_APP

// ;(async()=>{
//     try {
//         const connectionInstance = await mongoose.connect(`${process.env.MONGOO_URI}/${DB_NAME}` )
//         console.log(`/n MongoseDB connected !! DB Host ${connectionInstance.connection.host}`)
//         app.on("error", (err) => {
//             console.log("EORROR",err)
//             throw err
// app.listen(PORT , ()=>{
//     console.log(`server is listining on port ${PORT}`)
// })
//         })
//     } catch (error) {
//         console.error ('Mongoode DB connection error', error)
//     }
// })()



import dotenv from "dotenv"
import connectDB from "./db/db.index.js"
import { app } from "./app.js"
dotenv.config({
    path: "./env"
})
const PORT = process.env.PORT_APP || 5000

connectDB() 
// connectDB me hm async await laga ya tha wo jese hi compelte hota to ek promise return krta h 
.then(
    app.listen(PORT,()=>{
        console.log(`server in running on port ${PORT}`)
    })
)
.catch((err)=> console.log(`server connection failed ${err}`))







// script me (-r dotenv/config --experiment-json-modules) import krne k liye use kia wrna requied availble tha
// jb bh middlewaer a confirgiration ki setting kr h to app.use ka use kr te h
