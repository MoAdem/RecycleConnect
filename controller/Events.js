const Event = require('../model/Events');
const User = require('../model/User');


//waiting for user (role and auth)
exports.event_create = async (req, res) => {
    try {
      const organizerId = '6544ea08e814996f0b247b63'
  
      const organizer = await User.findById(organizerId);
      if (!organizer || organizer.role !== 'organization') {
        return res.status(403).json({ error: 'Unauthorized access' });
      }
  
      const { nameEvent, descriptionEvent, startEvent, endEvent, addressEvent } = req.body;
      //cant be empty
      if (!nameEvent || !descriptionEvent || !startEvent || !endEvent || !addressEvent) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      const event = new Event({
        nameEvent,
        descriptionEvent,
        startEvent,
        endEvent,
        addressEvent,
        organizer: organizerId,
      });
  
      await event.save();
  
      res.status(201).json({ success: true, event });
    } catch (error) {
      console.error(error);

      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ error: errors });
      }
      //other errors
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.all_events = async (req, res) => {
    try {
      const events = await Event.find();
      res.status(200).json({ success: true, events });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  // Retrieve event by id
  exports.event_byid = async (req, res) => {
    try {
      const eventId = req.params.id; 
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.status(200).json({ success: true, event });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Retrieve events by orgID
exports.event_byorg = async (req, res) => {
  try {
    const organizerId = req.params.organizerId;

    const organizer = await User.findById(organizerId);

    console.log('Organization:', organizer);
    if (!organizer || organizer.role !== 'organization') {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const events = await Event.find({ organizer: organizerId });

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid organizer ID' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};
// update event info
exports.event_update = (req, res) => {
  const eventId = req.params.id;
  const updates = req.body;

  Event.findById(eventId)
    .then((event) => {
      if (!event) {
        return res.status(404).json({
          success: false,
          message: 'Event not found',
        });
      }

      Object.keys(updates).forEach((key) => {
        event[key] = updates[key];
      });

      return event.save();
    })
    .then((updatedEvent) => {
      res.status(200).json({
        success: true,
        event: updatedEvent,
      });
    })
    .catch((error) => {
      console.error(error);
      if (error.name === 'CastError') {
        return res.status(400).json({
          success: false,
          message: 'Invalid event ID',
        });
      }
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({
          success: false,
          error: errors,
        });
      }
      res.status(500).json({
        success: false,
        message: 'Internal server error',
      });
    });
};
//delete event
exports.event_delete = async (req, res) => {
  try {
    const eventId = req.params.id;
    const organizerId = '6544ea08e814996f0b247b63'//const organizerId = req.user.id; 

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    if (event.organizer.toString() !== organizerId) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access. Only the organizer can delete this event.',
      });
    }

    await Event.findByIdAndDelete(eventId);

    res.status(200).json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid event ID',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

