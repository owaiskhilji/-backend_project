import mongoose from "mongoose";
import { DB_NAME } from "../utils/constants.js";


const connectDB = async () => {
    try {
        // mongoose ap ko ek object return deta h
       const connectionInstance = await mongoose.connect(`${process.env.MONGOO_URI}/${DB_NAME}` )
           console.log(`/n MongoseDB connected !! DB Host ${connectionInstance.connection.host}`)
        
    } catch (error) {
        console.error ('Mongoode DB connection error', error)
        process.exit(1)
    }
} 

export default connectDB