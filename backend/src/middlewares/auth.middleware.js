import { Student } from "../models/student.model.js";
import { Faculty } from "../models/faculty.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';

const veriJwt = asyncHandler(async (req, res, next) => {
    let user;

    if (req.cookies?.accessToken ) {
        const token = req.cookies?.accessToken ;

        if (!token) {
            // res.status(401).json({ success: false, message: "Unauthorized access - Token not found" });
            return next(new ApiError(401, "Token not found, you are not logged in"));
        }

        try {
            const extractedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            
console.log("Extracted Token Payload:", extractedToken);


            if (extractedToken?.role === "Student") {
                user = await Student.findById(extractedToken?._id).select("-password -refreshToken");
            } 

            if (extractedToken.role === "Faculty") {
                user = await Faculty.findById(extractedToken?._id).select("-password -refreshToken");
            }

            if (!user) {
                return res.status(401).json({ success: false, message: "Invalid access token" });
            }

            req.user = user;
            next();
        } catch (error) {
            return next(new ApiError(401, "Invalid access token"));
            
        }
    } else {
        return res.status(401).json({ success: false, message: "Token not found" })
    }
});

export { veriJwt };
