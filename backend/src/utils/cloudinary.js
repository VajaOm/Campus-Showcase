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

        const response = await cloudinary.v2.uploader.upload(localfilepath, 
            { resource_type: "auto", folder: foldername }
        );

        console.log("File uploaded successfully : ",response.url);
        fs.unlinkSync(localfilepath);
        return response;
    } catch (error) {
        //removing locally file saved if the upload operation got failed...
        fs.unlinkSync(localfilepath);
        return null;

    }
}

export {uploadOnCloudinary};