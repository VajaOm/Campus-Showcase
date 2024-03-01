import {Router} from 'express';
import { registerUser, loginUser, logoutUser, getUserProfileData, profileUpload } from '../controllers/user.controller.js';
import { veriJwt } from '../middlewares/auth.middleware.js';

import { upload } from '../middlewares/multer.middleware.js';
import { addProject, getMyProjects } from '../controllers/project.controller.js';


const router = Router();


router.route("/addproject").post(veriJwt, upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'video', maxCount: 1 },
    { name: 'sourceCode' },
    { name: 'ppt', maxCount: 1 },
  ]),addProject);

  router.route("/myprojects").get(veriJwt, getMyProjects);

export default router;