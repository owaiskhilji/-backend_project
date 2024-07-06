import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username:{
            type : String,
            required : true,
            unique : true,
            trim : true,
            lowercase : true,
            index : true  // searching feild kisi bh feild pr enable krni h to index ka use hoga
        },
        email:{
            type : String,
            required : true,
            unique : true,
            trim : true,
            lowercase : true,
        },
        fullName:{
            type : String,
            required : true,
            trim : true,
        },
        avatar : {
            type : String, // cloudinary URL
        required : true
        },
        coverImage : {
            type : String // cloudinary URL
                },
        password :{
            type : String,
            required : [true ," password is requried"]
        },
        watchHistory : [
            {
                type : Schema.Types.ObjectId,
                ref : "Video"
            }
        ],
        refreshToken:{
            type : String
        }

    }
,{timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password =await bcrypt.hash(this.password,10) // do parameter leta h phla kiso ko hsh krna h dusra kitna round krna h
    next()
})
// kuxh ese methods ka use krna hoga take user ko import krae to user se pouch le k pasword shi ya nh
// is me ap custom method bh bna skte ho 
userSchema.methods.inCorrectPassword = async function(password){
    // bcrpt agr password hasg kr ta h to whi check bh krta h
    return await bcrypt.compare(password,this.password)   
}
// ACCESS TOKEN
userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        // payload
        {
            _id : this.id, // mondoosebd se get kia h
            username : this.username,
            email : this.email,
            fullName : this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expireIn : process.env.ACCESS_TOKEN_EXPIRY 
        }
    )
}
//REFRESH ACCESS TOKEN
userSchema.methods.generaterefreshAccessToken = function(){
    jwt.sign(
        // payload
        {
            _id : this.id, // mondoosebd se get kia h
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expireIn : process.env.REFRESH_TOKEN_EXPIRY 
        }
    )
}

export const User = mongoose.model("User",userSchema)
 

