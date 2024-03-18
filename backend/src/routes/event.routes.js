import {Router} from 'express';
import { veriJwt } from '../middlewares/auth.middleware.js';
import validateFaculty from '../middlewares/validateFaculty.middleware.js';
import { createEvent } from '../controllers/event.controller.js';
import {upload} from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/eventcreate').post(veriJwt, validateFaculty, upload.single('image'), createEvent)

export default router;