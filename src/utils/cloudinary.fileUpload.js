import { v2 as cloudinary } from 'cloudinary';
// // fs asal me file ko read write async wagera k liye use hta h
 import fs from "fs"

// Configuration
    cloudinary.config({ 
        cloud_name:process.env.CLOUD_API_NAME, 
        api_key:process.env.CLOUD_API_API, 
        api_secret:process.env.CLOUD_API_SECRET
    });
    
    const uploadFileCloudinary = async (uploadfilePath) =>{
        try {
            if (!uploadfilePath) return null
            // upload file on cloudinary
            const response = await cloudinary.uploader
       .upload(uploadfilePath,{
        resource_type : 'auto'
       })
    //    file has been uploaded
     console.log(`fiile is uploaded ${response}`)
    fs.unlinkSync (uploadfilePath)
    return response
        } catch (error) {
            // (Sync) lga be ka mqsad ye zarrori h ho na hi chaye
        fs.unlinkSync (uploadfilePath)  // remove the locally saved temporary file as the upload operation got failed
        return null;          
        }
    }

    export { uploadFileCloudinary };


