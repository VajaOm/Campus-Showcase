import {Router} from 'express';
import { veriJwt } from '../middlewares/auth.middleware.js';
import validateFaculty from '../middlewares/validateFaculty.middleware.js';
import { createEvent, deleteEvent, getEventDetails, getEvents } from '../controllers/event.controller.js';
import {upload} from '../middlewares/multer.middleware.js';

const router = Router();

router.route('/eventcreate').post(veriJwt, validateFaculty, upload.single('image'), createEvent)

router.route('/getevents').get(veriJwt, getEvents)

router.route('/eventdetails/:eventId').get(veriJwt, getEventDetails)

router.route('/eventdelete/:eventId').get(veriJwt, validateFaculty, deleteEvent)

export default router;