import { asyncHandler } from '../utils/asyncHandler.js';
import {Student} from '../models/student.model.js';

const projectOwnerValidate = asyncHandler(async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { _id: userId } = req.user;

    const user = await Student.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const isProjectOwner = user.projects.includes(projectId);

    if (!isProjectOwner) {
      return res.status(403).json({
        success: false,
        message: 'User does not own this project',
      });
    }

    next();
  } catch (error) {
    console.error('Error in projectOwnerValidate middleware:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
});

export { projectOwnerValidate};
