import { Student } from "../models/student.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const validateFaculty = async (req, res, next) => {
    const  role  = req.user.role;
    
    if (!role) {
        return res.status(404).json(
            new ApiResponse(404, "user is not found")
        )
    }

    if (role !== 'Faculty') {
        return res.status(403).json(
            new ApiResponse(403, "Unauthorized")
        );
    }

    next();
};

export default validateFaculty;