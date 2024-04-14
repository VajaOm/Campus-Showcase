import { asyncHandler } from '../utils/asyncHandler.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Event } from '../models/event.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Student } from '../models/student.model.js'

const createEvent = asyncHandler(async (req, res) => {
    console.log("event creation page")
    try {
        const { name, description, startDate, endDate, eligibilityCriteria, judgingCriteria } = req.body;

        console.log(req.body)

        if (!name || !description || !startDate || !endDate || !eligibilityCriteria || !judgingCriteria) {
            throw new ApiError(402, "Missing fields");
        }
        // const {image} = req.file;

        const imageLocalpath = req.file?.path;

        const imageUpload = await uploadOnCloudinary(imageLocalpath, "image");

        if (!imageUpload) {
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

        if (!result) {
            throw new ApiError(402, "Problem while creating the Event");
        }

        res.status(200).json(
            new ApiResponse(200, "Event created successfully", result)
        )

    } catch (error) {
        console.log(error)
    }
})

const getEvents = asyncHandler(async (req, res) => {
    const events = await Event.find();

    if (!events) {
        throw new ApiError("Error in fetching the events");
    }

    res.status(200).json(
        new ApiResponse(200, "Events are fetched", events)
    )
})

const getEventDetails = asyncHandler(async (req, res) => {
    const { eventId } = req.params;

    if (!eventId) {
        throw new ApiError(401, "Event Id not found")
    }

    const event = await Event.findById(eventId);

    if (!event) {
        throw new ApiError(404, "event is not found")
    }

    const participatingStudents = await Student.find({
        participatedEvents: eventId
    });

    res.status(200).json(
        new ApiResponse(200, "event is fetched successfully", event, participatingStudents)
    )
})

const deleteEvent = asyncHandler(async (req, res) => {
   try {
     console.log("delete page")
     const { eventId } = req.params;
 
     if (!eventId) {
         throw new ApiError(402, "Event id not found");
     }
 
     const result = await Event.deleteOne({ _id: eventId });
 
     if (!result) {
         throw new ApiError(404, "Event not found")
     }
 
     res.status(200).json(
         new ApiResponse(200, "Event deleted successfully.", result)
     )
   } catch (error) {
    console.log(error)
   }
})


export { createEvent, getEvents, getEventDetails, deleteEvent }