import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import { Student } from '../models/student.model.js';
import { Faculty } from '../models/faculty.model.js';

const registerUser = asyncHandler (async (req, res) => {
    let createdUser;
    const {fullName, email, role, password, confirmPassword} = req.body;
    
    if(password != confirmPassword) {
        throw new ApiError(400, "Password and confirm password not matched");
    }

    if(role === "Student") {
        const user = await Student.create({
            fullName,
            email,
            password
        });
        createdUser = await Student.findById(user._id);
        console.log("Student : ", createdUser)
    }

    if(role === "Faculty") {
        const user = await Faculty.create({
            fullName,
            email,
            password
        });
        createdUser = await Faculty.findById(user._id);
    }
console.log(createdUser)
    if(!createdUser) {
        throw new ApiError(500,"Something wrong happening while user registration");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

});


export {registerUser}