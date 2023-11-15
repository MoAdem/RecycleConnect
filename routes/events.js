
import express from 'express';
const router = express.Router();
import multer from 'multer';
import eventController from '../controller/Events.js';
import upload from '../middleware/multer.js';


//merg
// routes
router.post('/create',upload.single('PhotoEvent'), eventController.event_create);
router.get('/',eventController.all_events)
router.get('/:id',eventController.event_byid)
router.get('/organizer/:organizerId',eventController.event_byorg)
router.put('/:id',eventController.event_update)
router.delete('/delete/:id', eventController.event_delete);

export default router;
