import { Student } from "../models/student.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Project } from "../models/project.model.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';


const addProject = asyncHandler(async (req, res) => {
    console.log("add project page ")
    const { title, description, tools, category } = req.body;
    const { images, video, sourceCode, ppt } = req.files;

    let user;
 
    const { _id, role } = req.user;

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

    
    //Uploadint source code files onto the cloudinary
    console.log(sourceCode)
    const sourceCodeUploadPromises = sourceCode.map(async (sourceCode) => {
        return uploadOnCloudinary(sourceCode.path, "ProjectsSourceCode");
    });
    
    const sourceCodeUploadResults = await Promise.all(sourceCodeUploadPromises);
    const sourceCodeUrls = sourceCodeUploadResults.map(result => result.url);
    console.log(sourceCodeUrls)
    //PPT uploading on the cloudinary
    const pptUploadResult = await uploadOnCloudinary(ppt[0].path, "ProjectPpts");
    console.log("brfore")
    try {
        const imgStatus = await Project.create({
            title : title,
            description: description,
            tools: tools,
            category: category,
            images: imageUrls,
            video: videoUploadResult.url,
            ppt: pptUploadResult.url,
            sourceCode: sourceCodeUrls,
            owner: _id
        });
    
        console.log(imgStatus);
    } catch (error) {
        // console.error('Error during Project.create:', error);
    }

    if (!imgStatus) {
        throw new ApiError(402, "Error in adding data into the database");
    }

    res.status(201).json(
         new ApiResponse(200, "Project Added successfully.", imgStatus)
    )

});

const getMyProjects = asyncHandler(async (req, res) => {
    //get project that has the same id as req.user

    const {_id} = req.user;

    const projects = await Project.find({owner: _id});

    console.log(projects)
    if (!projects || projects.length === 0) {
        return res.status(404).json(new ApiResponse(404, "There is no project"));
    }

    res.status(200).json(
        new ApiResponse(200, "Projects are fetched", projects)
    )

});

const deleteProject = asyncHandler( async (req,res) => {
    const {id} = req.body;

    const deleteStatus = await Project.deleteOne({_id : id});

    if(!deleteStatus) {
        throw new ApiError(402, "Error in deleting the project");
    }

    res.status(200).json(
        new ApiResponse(200, "Deletion of project successfull", deleteStatus)
    )
})

export { addProject, getMyProjects, deleteProject };