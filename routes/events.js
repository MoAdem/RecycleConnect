const express = require('express');
const router = express.Router();
const event_controller = require('../controller/Events')

// routes
router.post('/create', event_controller.event_create);
router.get('/',event_controller.all_events)
router.get('/:id',event_controller.event_byid)
router.get('/organizer/:organizerId',event_controller.event_byorg)
router.put('/:id',event_controller.event_update)
router.delete('/delete/:id', event_controller.event_delete);

module.exports = router;
