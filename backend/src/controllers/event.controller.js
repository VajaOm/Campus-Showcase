import {asyncHandler} from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import {Event} from '../models/event.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const createEvent = asyncHandler(async (req, res) => {
    console.log("event creation page")
   try {
     const {name, description, startDate, endDate, eligibilityCriteria, judgingCriteria} =  req.body;

     console.log(req.body)
 
     if (!name || !description || !startDate || !endDate || !eligibilityCriteria || !judgingCriteria) {
         throw new ApiError(402,"Missing fields");
     }
     // const {image} = req.file;
 
     const imageLocalpath = req.file?.path;
 
     const imageUpload = await uploadOnCloudinary(imageLocalpath, "image");
 
     if(!imageUpload) {
         throw new ApiError(402, "Error in uploading the events image");
     }
 
     const result = await Event.create(
         {
             name,
             description,
             startDate,
             endDate,
             eligibilityCriteria,
             judgingCriteria,
             image: imageUpload.url
         }
     );
 
     if(!result) {
         throw new ApiError(402,"Problem while creating the Event");
     }
 
     res.status(200).json(
         new ApiResponse(200, "Event created successfully", result)
     )
 
   } catch (error) {
    console.log(error)
   }
})

export {createEvent}