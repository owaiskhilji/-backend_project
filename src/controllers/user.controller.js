import {apiError} from "../utils/apiError.js"
import {User} from "../models/user.model.js"
import {asyncHendler} from "../utils/asyncHendler.js";
import  { uploadFileCloudinary} from "../utils/cloudinary.fileUpload.js"
import {ApiResponse} from "../utils/apiResponse.js"

const registerUser = asyncHendler(async (req, res) => {
    // res.status(200).json({ message: " hello " });

// 1 get users details from frontend
// 2 validation -not emplt
// 3 check if user already exists : username , email
// 4 check for image , check for avatar
// 5 upload them to cloudinary,avatar
// 6 create user object - create - entry in db(kio k jb mongoodb me jb data bhjna h to non-equal database h to ziyadatr objects bnae jate h)
// 7 remove password and refrash token field from response 
// 8 check for user creation
// 9 check res

// 1
const {username,email,fullName,password}=req.body
console.log("email : ",email)
console.log("req.body",req.body)
//2
if (
    [username,email,fullName,password].some((fields) => fields?.trim() === "")
) {
    throw new apiError(400,"All feilds is required")
}

// 3
//(findOne) sb se email kre wi return krta h
 const userExists =await User.findOne(
   {
    $or:[
    { username },
    { email }
    ]
 }
)
if (userExists) {
    throw new apiError(409,"email and password already exists")
    
}


//4
// localpath name is liye rkha kio k yue hamare server pr h
 const avatarlocaPath = req.files?.avatar[0]?.path
//  const coverimagelocaPath = req.files?.coverImage[0]?.path
//  console.log("req.files",req.files)
let coverimagelocaPath;
if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverimagelocaPath = req.files.coverImage[0].path
}

 if(!avatarlocaPath){
    throw new apiError(400,"avatar is file is required")

}

// 5 
const avatar =await uploadFileCloudinary(avatarlocaPath)
const coverImage = await uploadFileCloudinary(coverimagelocaPath)
if(!avatar){
    throw new apiError(400,"avatar is file is required")

} 

// 6 
const user = await
 User.create({
    username,
    email,
    fullName,
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || ""
   }
) 

// 7
const createUser = await User.findById(user._id).select(
    // darsal yaha wo jis likhni hoti h jin ko remove krna h wrna select by default sb ko select kr leta isi liye shru me (-) laga ya h 
    "-password -refreshToken"
)

// 8
if(!createUser){
    throw new apiError(500,"sonething went wrong while registeration the user")

}

// 9 
return res.status(201).json(
    new ApiResponse(200,createUser,"user register successfully")
 )


});
export default registerUser;

