import { Student } from "../models/student.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Project } from "../models/project.model.js";
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import mongoose from 'mongoose'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';
import path from 'path'

const addProject = asyncHandler(async (req, res) => {
    console.log("add project page ")
    const { title, description, tools, category } = req.body;
    const { images, video, sourceCode, ppt } = req.files;

    let user;

    const { _id } = req.user;

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

    const sourceCodeUploadPromises = sourceCode.map(async (sourceCode) => {
        return uploadOnCloudinary(sourceCode.path, "ProjectsSourceCode");
    });
    
    const sourceCodeUploadResults = await Promise.all(sourceCodeUploadPromises);
    const sourceCodeUrls = sourceCodeUploadResults.map(result => result.url);

    //PPT uploading on the cloudinary
    const pptUploadResult = await uploadOnCloudinary(ppt[0].path, "ProjectPpts");

    const imgStatus = await Project.create({
        title: title,
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


    if (!imgStatus) {
        throw new ApiError(402, "Error in adding data into the database");
    }

    res.status(201).json(
        new ApiResponse(200, "Project Added successfully.", imgStatus)
    )

});

const getMyProjects = asyncHandler(async (req, res) => {
    //get project that has the same id as req.user

    const { _id } = req.user;

    const projects = await Project.find({ owner: _id });

    console.log(projects)
    if (!projects || projects.length === 0) {
        return res.status(404).json(new ApiResponse(404, "There is no project"));
    }

    res.status(200).json(
        new ApiResponse(200, "Projects are fetched", projects)
    )

});

const deleteProject = asyncHandler(async (req, res) => {
    const { deleteProjectId } = req.body;
    console.log("project id : " + deleteProjectId)

    const deleteStatus = await Project.deleteOne({ _id: deleteProjectId });

    if (!deleteStatus) {
        throw new ApiError(402, "Error in deleting the project");
    }

    res.status(200).json(
        new ApiResponse(200, "Deletion of project successfull", deleteStatus)
    )
})

const getprojectdata = asyncHandler(async (req, res) => {
    console.log("get project data backend")
    const {projectId} = req.params;

    try {
        const id = new mongoose.Types.ObjectId(projectId);
    
        const project = await Project.findById({_id : id});
    } catch (error) {
        throw new ApiError(403, "Project Id is wrong")
    }

    if(!project) {
        throw new ApiError(404,"Project not found");
    }

    res.status(200).json(
        new ApiResponse(200, "Project Found", project)
    )
    
});

export { addProject, getMyProjects, deleteProject, getprojectdata };