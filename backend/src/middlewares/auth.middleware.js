import { Student } from "../models/student.model.js";
import { Faculty } from "../models/faculty.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

const veriJwt = asyncHandler(async (req, res, next) => {

        let user;
        console.log("jwt veification start")
        // console.log(JSON.stringify(req.cookies))

        console.log(req.header("Authorization")?.replace("Bearer ", ""))

        if(req.cookies?.accessToken || req.header("Authorization")) {
            console.log("this is called")

            const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
            console.log("Token ::: " + token);
    
            if (!token) {
                throw new ApiError(401, "Unauthorized access");
            }
    
            const extractedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
            // console.log("extracted token :: " + JSON.stringify(extractedToken));
    
    
            if (extractedToken?.role === "Student") {
                user = await Student.findById(extractedToken?._id).select("-password -refreshToken");
            }
    
            if (extractedToken.role === "Faculty") {
                user = await Faculty.findById(extractedToken?._id).select("-password -refreshToken");
                console.log("faculty extracted token user :: "+user)
            }
    
            if (!user) {
                throw new ApiError(401, "Invalid access token");
            }
    
            req.user = user;
            next();
        }
        else{
            throw new ApiError(402, "Token not found")
        }
})

export {veriJwt}