import {Router} from 'express';
import { registerUser, loginUser, logoutUser, getUserProfileData, profileUpload } from '../controllers/user.controller.js';
import { veriJwt } from '../middlewares/auth.middleware.js';

import { upload } from '../middlewares/multer.middleware.js';
import { addProject, deleteImage, deletePpt, deleteProject, deleteSourcecode, deleteVideo, getAllProject, getMyProjects, getprojectdata, updateProjectData } from '../controllers/project.controller.js';
import {projectOwnerValidate} from '../middlewares/projectOwnershipValidation.middleware.js';
import validateFaculty from '../middlewares/validateFaculty.middleware.js';


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

  router.route("/getprojectdetails/:projectId").get(veriJwt, validateFaculty, getprojectdata)

  router.route("/getprojectdata/:projectId/deleteImage/:index").delete(veriJwt, projectOwnerValidate, deleteImage);

  router.route("/getprojectdata/:projectId/deleteSourcecode/:index").delete(veriJwt, projectOwnerValidate, deleteSourcecode);

  router.route("/getprojectdata/:projectId/deleteVideo").delete(veriJwt, projectOwnerValidate, deleteVideo);

  router.route("/getprojectdata/:projectId/deletePpt").delete(veriJwt, projectOwnerValidate, deletePpt);

  router.route("/getprojectdata/:projectId/updateProject").put(veriJwt, projectOwnerValidate, upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'video', maxCount: 1 },
    { name: 'sourcecode' },
    { name: 'ppt', maxCount: 1 },
  ]),updateProjectData);

  router.route("/getAllProjects").get(veriJwt, getAllProject);

export default router;