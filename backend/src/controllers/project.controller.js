


import { Faculty } from "../models/faculty.model.js";
import { Student } from "../models/student.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Project } from "../models/project.model.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { upload } from "../middlewares/multer.middleware.js";

const addProject = asyncHandler(async (req, res) => {
    const { title, description, tools, category } = req.body;
    const { images, video, ppt, sourceCode} = req.files;
    let user;
    // console.log(ppt)

    // console.log(title+ "/n"+ description+"/n"+tools+"/n"+category+"/n" );
    const { _id, role } = req.user;

    if (role === 'Student') {
        user = await Student.findById(_id);

        if (!user) {
            throw new ApiError(401, "User not found");
        }
        


        //Images uploading on the cloudinary
        const imageUploadPromises = images.map(async (image) => {
            return uploadOnCloudinary(image.path, "ProjectsImages");
        });

        const imageUploadResults = await Promise.all(imageUploadPromises);
        const imageUrls = imageUploadResults.map(result => result.url);


        //video uploading on the cloudinary
        const videoUploadResult = await uploadOnCloudinary(video[0].path, "ProjectsVideos");

        //PPT uploading on the cloudinary
        const pptUploadResult = await uploadOnCloudinary(ppt[0].path, "ProjectPpts");

        //Uploadint source code files onto the cloudinary
        console.log(sourceCode)
        const sourceCodeUploadPromises = sourceCode.map(async (sourceCode) => {
            return uploadOnCloudinary(sourceCode.path, "ProjectsSourceCode");
        });

        const sourceCodeUploadResults = await Promise.all(sourceCodeUploadPromises);
        const sourceCodeUrls = sourceCodeUploadResults.map(result => result.url);
console.log(sourceCodeUrls)

        const imgStatus = await Project.create({
            title,
            description,
            tools,
            category,
            images: imageUrls,
            video: videoUploadResult.url, // Uncomment this line to include the video URL
            ppt: pptUploadResult.url,
            sourceCode: sourceCodeUrls,
            owner: _id
        });
    }

    else if (role === "Faculty") {
        user = await Faculty.findById(_id);

        if (!user) {
            throw new ApiError(401, "User not found");
        }
    }


})


export { addProject };