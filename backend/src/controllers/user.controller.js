//user.controller.js
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Student } from '../models/student.model.js';
import { Faculty } from '../models/faculty.model.js';

const registerUser = asyncHandler(async (req, res) => {
    let createdUser;
    const { fullName, email, role, password } = req.body;

     

    if (role === "Student") {

        const existedUser = await Student.findOne({email});

        if(existedUser) {
            throw new ApiError(409,"Account exists! If you already registered, please log in.");
        }

        const user = await Student.create({
            fullName,
            email,
            password
        });
        console.log(user)
        createdUser = await Student.findById(user._id);
        console.log("Student : ", createdUser)
    }

    if (role === "Faculty") {

        const existedUser = await Faculty.findOne({email});

        if(existedUser) {
            throw new ApiError(409,"User already exists");
        }

        const user = await Faculty.create({
            fullName,
            email,
            password
        });
        console.log(user)
        createdUser = await Faculty.findById(user._id);
    }
    console.log(createdUser)
    if (!createdUser) {
        throw new ApiError(404, "Something wrong happening while user registration");
    }

    return res.status(201).json(
        new ApiResponse(200, "User registered successfully",createdUser)
    )
});

const generateAccessAndRefreshTokens = async (userID, role) => {
    try {
        var user;
        if (role === "Student") {
            user = await Student.findById(userID);
        }

        if (role === "Faculty") {
            user = await Faculty.findById(userID);
        }

        const accessToken = await user.generateAccessTokens();
        const refreshToken = await user.generateRefreshToken();

        //adding refreshToken into the db
        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

       

        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the access and refresh tokens.");
    }
}

const loginUser = asyncHandler(async (req, res) => {

    var user;
    const { email, username, role, password } = req.body;

    if (!email && !username) {
        throw new ApiError(400, "Username or email is required");
    }

    if (!password) {
        throw new ApiError(400, "Password is required");
    }

    if (role === "Student") {
        user = await Student.findOne({
            $or: [{ username }, { email }]
        });
    }

    if (role === "Faculty") {
        user = await Faculty.findOne({
            $or: [{ username }, { email }]
        });
    }

    if (!user) {
        throw new ApiError(404, "User does not exists.");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);

    if (!isPasswordMatch) {
        throw new ApiError(401, "You have entered wrong password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id, role);

    const options = {
        httponly: true,
        secure: true
    };

    return res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200,
            {
                user
            },
            "User is logged in"
            )
        )
});

export { registerUser, loginUser }