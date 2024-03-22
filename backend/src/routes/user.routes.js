import {Router} from 'express';
import { registerUser, loginUser, logoutUser, getUserProfileData, profileUpload, getStudents, getStudentProjects, updateFacultyProfile, updateStudentProfile } from '../controllers/user.controller.js';
import { veriJwt } from '../middlewares/auth.middleware.js';

import { upload } from '../middlewares/multer.middleware.js';
import validateFaculty from '../middlewares/validateFaculty.middleware.js';

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/profile").get(veriJwt, getUserProfileData).post(veriJwt, upload.single('avatar'), profileUpload)

router.route("/getstudents/:semester").get(veriJwt,validateFaculty, getStudents);

router.route("/getstudentprojects/:id").get(veriJwt,validateFaculty, getStudentProjects);

router.route("/logout").get(veriJwt, logoutUser);

router.route("/updateprofile").post(veriJwt, upload.single("avatar"), validateFaculty, updateFacultyProfile);
router.route("/updateprofile").post(veriJwt, updateFacultyProfile);

router.route("/updatestudentprofile").post(veriJwt, upload.single("avatar"), updateStudentProfile);
router.route("/updatestudentprofile").post(veriJwt, updateStudentProfile);


export default router;