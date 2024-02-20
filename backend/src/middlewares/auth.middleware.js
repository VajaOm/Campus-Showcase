import { Student } from "../models/student.model.js";
import { Faculty } from "../models/faculty.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

const veriJwt = asyncHandler(async (req, res, next) => {



    try {
        let user;
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        console.log("Token ::: " + token);

        if (!token) {
            throw new ApiError(401, "Unauthorized access");
        }

        const extractedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        console.log("extracted token :: " + extractedToken);


        if (extractedToken?.role === "Student") {
            user = await Student.findById(extractedToken?._id).select("-password -refreshToken");


        }

        if (extractedToken.role === "Faculty") {
            user = await Faculty.findById(extractedToken?._id).select("-password -refreshToken");
        }

        if (!user) {
            throw new ApiError(401, "Invalid access token");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access token");
    }

})

export {veriJwt}