//user.controller.js
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Student } from '../models/student.model.js';
import { Faculty } from '../models/faculty.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Project } from "../models/project.model.js";
import { UserVerification } from '../models/userVerificationSchema.model.js';
import { transporter } from '../utils/transporter.js';
import { generateVerificationToken } from '../utils/jwtGeneration.js';

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

    await sendVerificationEmail(req, res, createdUser);

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

        const accessToken = await user.generateAccessTokens(user);
        const refreshToken = await user.generateRefreshToken(user);

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
    } else {
        username = emailorusername;
    }

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
        sameSite: 'Strict'
    };

    if (role === "Faculty" && user.firstTime) {
        return res.status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(201,
                    "User is logged in",
                    {
                        user,
                        redirectTo: "/facultyProfile"
                    }
                )
            )

    } else if (role === "Student" && user.firstTime) {
        return res.status(201)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(201,
                    "User is logged in",
                    {
                        user,
                        redirectTo: "/studentProfile"
                    }
                )
            )
    }

    return res.status(201)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(201,
                "User is logged in",
                {
                    user,
                }
            )
        )
});


const getUserProfileData = asyncHandler(async (req, res) => {
    console.log("profile page rendering")

    const user = req.user;
    if (!user) {
        throw new Error('User not found');
    }
    res.json(new ApiResponse(201, "user data fetched", user));


});


const profileUpload = asyncHandler(async (req, res) => {
    console.log("update page rendering")
    const { username, enrollmentNo, year, semester, avatar } = req.body;
    const { _id, email, role } = req.user;

    let user, updatedUser;
    // console.log(req.file);


    const avatarLocalPath = req.file?.path;
    console.log(avatarLocalPath)
    const avatarCloudinary = await uploadOnCloudinary(avatarLocalPath, "avatars");
    // console.log(avatarCloudinary)
    if (!avatarCloudinary) {
        throw new ApiError(400, "image upload on the cloudinary failed");
    }

    if (role == "Student") {
        user = await Student.findById(_id)
        // console.log(user)

        updatedUser = await Student.updateOne({ email: email }, {
            $set: {
                username: username,
                enrollmentNo: enrollmentNo,
                year: year,
                semester: semester,
                avatar: avatarCloudinary.url
            }
        })
        // console.log(updatedUser);
    }

    if (role == "Faculty") {
        user = await Faculty.findById(_id)
        // console.log(user)

        updatedUser = await Faculty.updateOne({ email: email }, {
            $set: {
                username: username,
                avatar: avatarCloudinary.url
            }
        })
    }

    if (!user) {
        throw new ApiError(404, "User not found.");
    }

    if (!updatedUser.acknowledged) {
        throw new ApiError(500, "User data not added");
    }

    res.status(200).json(
        new ApiResponse(200, "User data added successfully", user)
    )

});




const logoutUser = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const userType = req.user.role; // Assuming you have a 'role' property in your user schema

    // Assuming you have models Faculty and Student imported appropriately
    let User;
    if (userType === 'Student') {
        User = Student;
    } else if (userType === 'Faculty') {
        User = Faculty;
    } else {
        // Handle other user types if necessary
        throw new ApiError(400, 'Invalid user type');
    }

    await User.findByIdAndUpdate(
        userId,
        {
            refreshToken: undefined
        },
        {
            new: true // this will return a new modified document
        }
    );

    const options = {
        httponly: true,
        secure: true,
        sameSite: 'Strict'
    };

    return res
        .status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new ApiResponse(200, 'User logged out.', {}));


});

const getStudents = asyncHandler(async (req, res) => {
    const { semester } = req.params;

    if (!semester) {
        throw new ApiError(404, "Semester required.")
    }

    const students = await Student.find({ semester });

    if (!students) {
        throw new ApiError(404, "Student not found");
    }

    res.status(200).json(
        new ApiResponse(200, "Students found", students)
    )

})

const getStudentProjects = asyncHandler(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        throw new ApiError(402, "id is not found");
    }

    const user = await Student.findById(id);

    if (!user) {
        throw new ApiError(404, 'user if not found');
    }

    const projectsId = user.projects;

    const projects = await Promise.all(projectsId.map(async projectId => {
        const project = await Project.findById(projectId);
        return project;
    }));

    // Step 4: Assemble the project details and send them as a response
    res.status(200).json({
        status: 'success',
        message: 'Projects fetched successfully.',
        projects: projects, user
    });
})


const updateFacultyProfile = asyncHandler(async (req, res) => {
    console.log("Update page");
    const { username, email } = req.body;
    const { _id } = req.user;

    const avatarLocalPath = req.file?.path || null;
    let uploadResult;

    if (avatarLocalPath) {
        uploadResult = await uploadOnCloudinary(avatarLocalPath, "avatar");

        if (!uploadResult) {
            throw new ApiError(401, 'Problem in uploading the image onto the cloudinary');
        }

        console.log(uploadResult)
    }

    const updatedFaculty = await Faculty.findOneAndUpdate(
        { _id: _id },
        { $set: { username: username, email: email, avatar: uploadResult?.secure_url || null, firstTime: false } },
        { new: true }
    );

    console.log(uploadResult)

    res.status(200).json({
        success: true,
        data: updatedFaculty,
        message: "Faculty profile updated successfully"
    });
});

const updateStudentProfile = asyncHandler(async (req, res) => {
    console.log("update page")
    const { username, email, year, semester, enrollmentNo } = req.body;
    const { _id } = req.user;
    console.log(username, email, year, semester, enrollmentNo)
    const avatarLocalPath = req.file?.path;

    let uploadResult;
    let avatarUpdate;
    if (avatarLocalPath) {
        uploadResult = await uploadOnCloudinary(avatarLocalPath, "avatar");

        if (!uploadResult) {
            throw new ApiError(402, "Problem while uploading the avatar onto the cloudinary.")
        }

        avatarUpdate = await Student.findOneAndUpdate(
            { _id: _id },
            { $set: { avatar: uploadResult.url } },
            { new: true }
        );
    }

    const result = await Student.findOneAndUpdate(
        { _id: _id },
        { $set: { username: username, email: email, year: year, semester: semester, enrollmentNo: enrollmentNo, firstTime: false } },
        { new: true }
    );

    if (!result) {
        throw new ApiError(402, "Error in updating the data");
    }

    res.status(200).json(
        new ApiResponse(200, "updating the data successfull", result, avatarUpdate)
    )
})

const sendVerificationEmail = asyncHandler(async (req, res, createdUser) => {

    const verificationToken = generateVerificationToken(createdUser);

    const verificationLink = `http://localhost:${process.env.FRONTEND_PORT}/emailVerification/${createdUser.role}/${createdUser._id}/${verificationToken}`;

    transporter.sendMail({
        from: process.env.AUTH_EMAIL,
        to: createdUser.email,
        subject: 'Email Verification',
        html: `<h1>Project Showcase</h1><br><p>Please click <a href="${verificationLink}">here</a> to verify your email address.</p>`
    },
        (error, info) => {
            if (error) {
                console.log(error);
                throw new ApiError(500, "Problem in sending the verification link")
            }
            else {
                console.log('Email sent : ' + info.response);
                res.status(200).json(
                    new ApiResponse(200, 'Email sent successfully', info.response)
                )
            }
        }
    )

    const userVerification = await UserVerification.create({
        token: verificationToken,
        userId: createdUser._id,
        idType: createdUser.role
    });
    await userVerification.save();
})

const verifyToken = asyncHandler(async (req, res) => {
    try {
        console.log("verify token rot")
        const { token, id, role } = req.params;
        console.log(id, role)
        if (!token) {
            throw new ApiError(401, 'Token is empty')
        }

        const isValid = await UserVerification.findOne({ token });

        let user;

        if (role === 'Student') {
            user = await Student.findById(id);
        }

        else {
            user = await Faculty.findById(id);
        }

        if (!isValid) {

            if (!user) {
                throw new ApiError(401, 'User not found');
            }
            await user.deleteOne();

            throw new ApiError(403, 'Token is not found in the database');
        }

        user.isVerified = true;
        await user.save();

        res.status(200).json(
            new ApiResponse(200, 'Email verification successfull', isValid)
        )
    } catch (error) {
        console.log(error)
    }

})

const passwordResetEmail = asyncHandler(async (req, res) => {
    try {
        console.log('password reset email route')
        const { email, role } = req.body;

        let user;
        if (role === 'Student') {
            user = await Student.findOne({ email });
        }
        else {
            user = await Faculty.findOne({ email });
        }

        if (!user) {
            throw new ApiError(401, 'User not exist.');
        }

        const verificationToken = generateVerificationToken(user);

        const verificationLink = `http://localhost:${process.env.FRONTEND_PORT}/verifyPasswordResetToken/${role}/${user._id}/${verificationToken}`;

        transporter.sendMail({
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: 'Password Reset',
            html: `<h1>Project Showcase</h1><br><p>Please click <a href="${verificationLink}">here</a> to reset your password.</p>`
        },
            async (error, info) => {
                if (error) {
                    console.log(error);
                    throw new ApiError(500, "Problem in sending the verification link")
                }
                else {
                    console.log('Email sent : ' + info.response);
                    const userVerification = await UserVerification.findOneAndUpdate(
                        { userId: user._id },
                        { $set: { passwordToken: verificationToken } },
                        { new: true }
                    );

                    await userVerification.save();
                    res.status(200).json(
                        new ApiResponse(200, 'Email sent successfully', info.response)
                    )
                }
            }
        )
    } catch (error) {
        console.log(error)
    }

})

const verifyPasswordResetToken = asyncHandler(async (req, res) => {
    try {
        const { token, id, role } = req.params;
        // console.log(id, role)
        console.log(token)
        if (!token) {
            throw new ApiError(401, 'Token is empty')
        }

        const status = await UserVerification.findOne({ passwordToken: token });

        if (!status) {
            throw new ApiError(403, 'Token is not found in the database');
        }

        res.status(200).json(
            new ApiResponse(200, 'reset password token successfully matched', status)
        )
    } catch (error) {
        console.log(error)
    }
})

const passwordeUpdate = asyncHandler(async (req, res) => {
    try {
        console.log * ("password update ")
        const { newPassword, confirmPassword } = req.body;
        const { id, role } = req.params;

        if (newPassword !== confirmPassword) {
            throw new ApiError(401, 'Password not matched');
        }

        let user;
        if (role === 'Student') {
            user = await Student.findOne({ _id: id });
        }
        else {
            user = await Faculty.findOne({ _id: id });
        }

        if (!user) {
            throw new ApiError(401, 'User not exist.');
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json(
            new ApiResponse(200, 'password reset Successfully', user)
        )
    } catch (error) {
        console.log(error)
    }
})

const getCookie = asyncHandler(async (req, res) => {
    const accessToken = req.cookies.accessToken;

    if (!accessToken) {
        throw new ApiError(403, 'Token not found')
    }

    res.status(200).json(
        new ApiResponse(200, 'Accesstoken found')
    )
})

const participatedEvents = asyncHandler(async (req, res) => {
    const { _id, role } = req.user;

    let user;
    if (role === 'Student') {
        user = await Student.findById(_id);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }
    }

    res.status(200).json(
        new ApiResponse(200,'Participated Events found', user.participatedEvents)
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfileData,
    profileUpload,
    getStudents,
    getStudentProjects,
    updateFacultyProfile,
    updateStudentProfile,
    sendVerificationEmail,
    verifyToken,
    passwordResetEmail,
    verifyPasswordResetToken,
    passwordeUpdate,
    getCookie,
    participatedEvents,
    
}
