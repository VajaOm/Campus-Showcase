import {Router} from 'express';
import { registerUser, loginUser, logoutUser, getUserProfileData, profileUpload } from '../controllers/user.controller.js';
import { veriJwt } from '../middlewares/auth.middleware.js';

import { upload } from '../middlewares/multer.middleware.js';

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/profile").get(veriJwt, getUserProfileData).post(veriJwt, upload.single('avatar'), profileUpload)

router.route("/logout").get(veriJwt,logoutUser);


export default router;