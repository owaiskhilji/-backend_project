import { User } from "../models/user.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHendler } from "../utils/asyncHendler.js";
import jwt from "jsonwebtoken";



export const verifyJwt = asyncHendler(async(req,_,next)=>{
  try {

const token = req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer ", "")
if (!token) {
  throw new apiError(401,"unauthorization") 
}
const decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
const user = await User.findById(decoded?._id).select("-password -refreshToken")
req.user = user 
next()

} catch (error) {
throw new apiError(401, error?.message || "Invalid access token")
}
  }
)