import mongoose,{Schema} from "mongoose";


const subscribtionSchema = new Schema(
    {
Channel:{
    type: Schema.Types.ObjectId,
    ref: "User"
},
Subscriber:{
    type: Schema.Types.ObjectId,
    ref: "User"
}
},
{timestamps:true})


export const Subscription = mongoose.model("Subscription",subscribtionSchema)