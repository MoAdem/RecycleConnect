
import express from 'express';
const router = express.Router();
import multer from 'multer';
import eventController from '../controller/Events.js';
import upload from '../middleware/multer.js';


/**
 * @swagger
 * tags:
 *   name: Events
 *   description: API for managing events
 */
//merg
// routes
router.post('/:id/interested', eventController.mark_interested);
router.post('/:id/going', eventController.mark_going);


/**
 * @swagger
 * /api/events/create:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: nameEvent
 *         type: string
 *         required: true
 *         description: Name of the event
 *       - in: formData
 *         name: descriptionEvent
 *         type: string
 *         required: true
 *         description: Description of the event
 *       - in: formData
 *         name: addressEvent
 *         type: string
 *         required: true
 *         description: Address of the event
 *       - in: formData
 *         name: startEvent
 *         type: string
 *         required: true
 *         description: Start time of the event
 *       - in: formData
 *         name: PhotoEvent
 *         type: file
 *         required: false
 *         description: Photo of the event
 *     responses:
 *       201:
 *         description: Event created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               event:
 *                 _id: 60c12c4f3c1b7d001cc53458
 *                 nameEvent: "Sample Event"
 *                 descriptionEvent: "Sample Description"
 *                 addressEvent: "Sample Address"
 *                 startEvent: "2023-11-21T12:00:00.000Z"
 *                 PhotoEvent: "http://example.com/uploads/sample.jpg"
 *                 organizer: "6544ea08e814996f0b247b63"
 */

router.post('/create',upload.single('PhotoEvent'), eventController.event_create);
/**
 * @swagger
 * /api/events/:
 *   get:
 *     summary: Retrieve all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: Successfully retrieved events
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               events:
 *                 - _id: 60c12c4f3c1b7d001cc53458
 *                   nameEvent: "Sample Event"
 *                   descriptionEvent: "Sample Description"
 *                   addressEvent: "Sample Address"
 *                   startEvent: "2023-11-21T12:00:00.000Z"
 *                   PhotoEvent: "http://example.com/uploads/sample.jpg"
 *                   organizer: "6544ea08e814996f0b247b63"
 */
router.get('/',eventController.all_events)
/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Retrieve an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the event
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               event:
 *                 _id: 60c12c4f3c1b7d001cc53458
 *                 nameEvent: "Sample Event"
 *                 descriptionEvent: "Sample Description"
 *                 addressEvent: "Sample Address"
 *                 startEvent: "2023-11-21T12:00:00.000Z"
 *                 PhotoEvent: "http://example.com/uploads/sample.jpg"
 *                 organizer: "6544ea08e814996f0b247b63"
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Event not found"
 */
router.get('/:id',eventController.event_byid)
/**
 * @swagger
 * /api/events/organizer/{organizerId}:
 *   get:
 *     summary: Retrieve events by organizer ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: organizerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Organizer ID
 *     responses:
 *       200:
 *         description: Successfully retrieved events
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               events:
 *                 - _id: 60c12c4f3c1b7d001cc53458
 *                   nameEvent: "Sample Event"
 *                   descriptionEvent: "Sample Description"
 *                   addressEvent: "Sample Address"
 *                   startEvent: "2023-11-21T12:00:00.000Z"
 *                   PhotoEvent: "http://example.com/uploads/sample.jpg"
 *                   organizer: "6544ea08e814996f0b247b63"
 *       404:
 *         description: Organizer not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Organization not found"
 */
router.get('/organizer/:organizerId',eventController.event_byorg)
/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nameEvent:
 *                 type: string
 *               descriptionEvent:
 *                 type: string
 *               addressEvent:
 *                 type: string
 *               startEvent:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               event:
 *                 _id: 60c12c4f3c1b7d001cc53458
 *                 nameEvent: "Updated Event"
 *                 descriptionEvent: "Updated Description"
 *                 addressEvent: "Updated Address"
 *                 startEvent: "2023-11-22T12:00:00.000Z"
 *                 organizer: "6544ea08e814996f0b247b63"
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Event not found"
 */

router.put('/:id', eventController.event_update);

/**
 * @swagger
 * /api/events/delete/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Event deleted successfully"
 *       403:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             example:
 *               error: "Unauthorized access. Only the organizer can delete this event."
 *       404:
 *         description: Event not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Event not found"
 */
router.delete('/delete/:id', eventController.event_delete);

export default router;
