import {Router} from 'express';
import { registerUser, loginUser, logoutUser, getUserProfileData, profileUpload } from '../controllers/user.controller.js';
import { veriJwt } from '../middlewares/auth.middleware.js';

import { upload } from '../middlewares/multer.middleware.js';
import { addProject, deleteProject, getMyProjects, getprojectdata } from '../controllers/project.controller.js';
import {projectOwnerValidate} from '../middlewares/projectOwnershipValidation.middleware.js';


const router = Router();


router.route("/addproject").post(veriJwt, upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'video', maxCount: 1 },
    { name: 'sourceCode' },
    { name: 'ppt', maxCount: 1 },
  ]),addProject);

  router.route("/myprojects").get(veriJwt, getMyProjects);

  router.route("/deleteproject").post(veriJwt, deleteProject);


  router.route("/getprojectdata/:projectId").get(veriJwt, projectOwnerValidate, getprojectdata);

export default router;