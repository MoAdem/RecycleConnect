import Event from '../model/Events.js';
import User from '../model/User.js';
import cloudinary from '../middleware/cloudinary.js';

// Create an event
const eventsController = {
   uploadToCloudinary : async (base64String) => {
    try {
      const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64String}`);
      return result.secure_url;
    } catch (error) {
      throw error;
    }
  },
  
   event_create : async (req, res) => {
    try {
      const organizerId = "65746c185afcfaae3d4b5704"; // req.user.id waiting for auth middleware
  
      const organizer = await User.findById(organizerId);
      if (!organizer || organizer.role !== 'organization') {
        return res.status(403).json({ error: 'Unauthorized access' });
      }
  
      const { nameEvent, descriptionEvent, addressEvent, startEvent, PhotoEvent } = req.body;
  
      if (!nameEvent || !descriptionEvent || !addressEvent || !startEvent || !PhotoEvent) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      // Decode the base64 string and upload to Cloudinary
      const photo = await eventsController.uploadToCloudinary(PhotoEvent);
  
      const event = new Event({
        nameEvent,
        descriptionEvent,
        addressEvent,
        startEvent,
        PhotoEvent: photo,
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
  
      res.status(500).json({ error: 'Internal server error' });
    }
  },
  
  

// Retrieve all events
 all_events : async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
},

// Retrieve event by id
 event_byid : async (req, res) => {
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
},

// Retrieve events by orgID
event_byorg: async (req, res) => {
  try {
    
    const userId = "6544ea08e814996f0b247b63" //req.user.id waiting for auth middleware

    const user = await User.findById(userId);

    if (!user || user.role !== 'organization') {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const events = await Event.find({ organizer: userId });

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid user ID' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
},


// Update event info
 event_update : async (req, res) => {
  try {
    const eventId = req.params.id;
    const updates = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    Object.keys(updates).forEach((key) => {
      event[key] = updates[key];
    });

    const updatedEvent = await event.save();

    res.status(200).json({
      success: true,
      event: updatedEvent,
    });
  } catch (error) {
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
  }
},

// Delete event
 event_delete : async (req, res) => {
  try {
    const eventId = req.params.id;
    const organizerId = '65746c185afcfaae3d4b5704'; //req.user.id waiting for auth middleware

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
},

mark_interested: async (req, res) => {
  try {
    const userId = '6544f9baeed3721e4513c03e';//req.user.id waiting for auth middleware
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if the user is already marked as interested
    if (event.interested.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'User is already marked as interested',
      });
    }

    event.interested.push(userId);
    await event.save();

    res.status(200).json({
      success: true,
      message: 'User marked as interested in the event',
    });
  } catch (error) {
    console.error(error);
    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
},

// Mark user as going to an event
mark_going: async (req, res) => {
  try {
    const userId = '6544ea08e814996f0b247b63';//req.user.id waiting for auth middleware
    const eventId = req.params.id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: 'Event not found',
      });
    }

    // Check if the user is already marked as going
    if (event.going.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: 'User is already marked as going',
      });
    }

    // Remove user from interested list if already marked as interested
    const interestedIndex = event.interested.indexOf(userId);
    if (interestedIndex !== -1) {
      event.interested.splice(interestedIndex, 1);
    }

    event.going.push(userId);
    await event.save();

    res.status(200).json({
      success: true,
      message: 'User marked as going to the event',
    });
  } catch (error) {
    console.error(error);
    // Handle other errors
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
},



}
export default eventsController