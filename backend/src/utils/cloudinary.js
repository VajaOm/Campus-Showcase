//cloudinary.js

import cloudinary from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localfilepath, foldername) => {
    try {
        if(!localfilepath) {
            return null;
        }
        console.log(localfilepath)

        const response = await cloudinary.v2.uploader.upload(localfilepath, 
            { resource_type: "auto", folder: foldername }
        );
        if (response && response.url) {
            console.log("File uploaded successfully:", response.url);

            // Delete the local file after a successful upload
            fs.unlinkSync(localfilepath);

            return response;
        }
    } catch (error) {
        //removing locally file saved if the upload operation got failed...
        fs.unlinkSync(localfilepath);
        return null;
    }
}

export {uploadOnCloudinary};