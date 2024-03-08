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
    console.log(video)
    let user;

    const { _id } = req.user;

    user = await Student.findById(_id);

    if (!user) {
        throw new ApiError(401, "User not found");
    }

    //Images uploading on the cloudinary
    const imageUploadPromises = images.map(async (image) => {
        const uploadResult = await uploadOnCloudinary(image.path, "ProjectsImages");
        console.log(uploadResult)
        return { fileName: image.originalname, fileUrl: uploadResult.url };
    });

    const imageUploadResults = await Promise.all(imageUploadPromises);


    //video uploading on the cloudinary
    const videoUploadResult = await uploadOnCloudinary(video[0].path, "ProjectsVideos");

    const videoInfo = { fileName: video[0].originalname, fileUrl: videoUploadResult.url }

    // console.log(videoInfo)

    const sourceCodeUploadPromises = sourceCode.map(async (sourceCode) => {
        const uploadResult = await uploadOnCloudinary(sourceCode.path, "ProjectsSourceCode");
        console.log(uploadResult)
        return { fileName: sourceCode.originalname, fileUrl: uploadResult.url }
    });

    const sourceCodeUploadResults = await Promise.all(sourceCodeUploadPromises);

    //PPT uploading on the cloudinary
    const pptUploadResult = await uploadOnCloudinary(ppt[0].path, "ProjectPpts");
    const pptInfo = { fileName: ppt[0].originalname, fileUrl: pptUploadResult.url }

    try {
        const imgStatus = await Project.create({
            title: title,
            description: description,
            tools: tools,
            category: category,
            images: imageUploadResults,
            video: videoInfo,
            ppt: pptInfo,
            sourceCode: sourceCodeUploadResults,
            owner: _id
        });

        if (!imgStatus) {
            throw new ApiError(402, "Error in adding data into the database");
        }

        //addition of project into Student schema
        user.projects.push(imgStatus._id)
        await user.save();

        console.log(imgStatus)
        res.status(201).json(
            new ApiResponse(200, "Project Added successfully.", imgStatus)
        )
        console.log(imgStatus);
    } catch (error) {
        console.log("Error in .... " + error)
    }



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
    const { _id: userId } = req.user;

    try {
        // Use updateOne to remove the project ID from the user's projects array
        const updateResult = await Student.updateOne({ _id: userId }, { $pull: { projects: deleteProjectId } });

        // Check if the update was successful
        if (updateResult.nModified === 0) {
            throw new ApiError(404, "Project not found in user's projects");
        }

        console.log("Deleting the project id from user: " + userId);

        // Delete the project from the Project collection
        const deleteStatus = await Project.deleteOne({ _id: deleteProjectId });

        if (!deleteStatus) {
            throw new ApiError(402, "Error in deleting the project");
        }

        res.status(200).json(
            new ApiResponse(200, "Deletion of project successful", deleteStatus)
        );
    } catch (error) {
        console.log(error);
        res.status(error.statusCode || 500).json(
            new ApiResponse(error.statusCode || 500, error.message, null)
        );
    }
});

const getprojectdata = asyncHandler(async (req, res) => {
    console.log("get project data backend")
    const { projectId } = req.params;

    try {
        const id = new mongoose.Types.ObjectId(projectId);

        const project = await Project.findById({ _id: id });
        if (!project) {
            throw new ApiError(404, "Project not found");
        }

        res.status(200).json(
            new ApiResponse(200, "Project Found", project)
        )
    } catch (error) {
        throw new ApiError(403, "Project Id is wrong")
    }


});

export { addProject, getMyProjects, deleteProject, getprojectdata };