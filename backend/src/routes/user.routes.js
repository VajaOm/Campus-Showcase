import {Router} from 'express';
import { registerUser, loginUser, profileCreation, logoutUser } from '../controllers/user.controller.js';
import { veriJwt } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/profile").get(veriJwt, profileCreation)

router.route("/logout").get(veriJwt,logoutUser);

export default router;