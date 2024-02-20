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

        const existedUser = await Student.findOne({ email });

        if (existedUser) {
            throw new ApiError(409, "Account exists! If you already registered, please log in.");
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

        const existedUser = await Faculty.findOne({ email });

        if (existedUser) {
            throw new ApiError(409, "User already exists");
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
        new ApiResponse(200, "User registered successfully", createdUser)
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

        const accessToken = await user.generateAccessTokens(user,role);
        const refreshToken = await user.generateRefreshToken(user,role);

        //adding refreshToken into the db
        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });


        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating the access and refresh tokens.");
    }
}

const loginUser = asyncHandler(async (req, res) => {

    var user, email, username;
    const { emailorusername, role, password } = req.body;

    if (emailorusername.includes("@gmail.com")) {
        email = emailorusername;
    }
    else {
        username = emailorusername;
    }

    console.log("Email :: ", email);
    console.log("username :: ", username)
    console.log("Role :: ", role)

    if (role === "Student") {
        if (emailorusername.includes("@gmail.com")) {
            user = await Student.findOne({ email: emailorusername });
        } else {
            user = await Student.findOne({ username: emailorusername });
        }
    }

    if (role === "Faculty") {
        if (emailorusername.includes("@gmail.com")) {
            user = await Faculty.findOne({ email: emailorusername });
        } else {
            user = await Faculty.findOne({ username: emailorusername });
        }
    }

    console.log(user)

    if (!user) {
        throw new ApiError(404, "Account not found. If you haven't registered yet, please sign up.");
    }

    const isPasswordMatch = await user.isPasswordCorrect(password);

    if (!isPasswordMatch) {
        throw new ApiError(401, "You have entered wrong password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id, role);

    const options = {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'None'
    };


    return res.status(201)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200,
                "User is logged in",
                {
                    user,
                }
            )
        )
});

export { registerUser, loginUser }