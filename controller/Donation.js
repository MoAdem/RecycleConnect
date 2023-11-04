const Donation = require("../model/Donation");
const User = require("../model/User");
const Event = require("../model/Events");


// item donation
exports.item_donation = async (req, res) => {
  try {
    // Extract donation details from the request body
    const { organizationId, eventId, items, isAnonymous } = req.body;

    // Validate required fields
    if (!organizationId && !eventId) {
      return res.status(400).json({ error: 'Organization ID or Event ID is required' });
    }

    // Validate items
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Items to donate are required' });
    }

    // Create the donation
    const donation = new Donation({
      items,
      isAnonymous,
      donor:"6544f9baeed3721e4513c03e",//req.user.id, 
      organization: organizationId,
      event: eventId,
    });

    await donation.save();

    res.status(201).json({ success: true, donation });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// all user donations
exports.user_donations = async (req, res) => {
  try {
    const userId ="6544f9baeed3721e4513c03e"//req.user.id
    const donations = await Donation.find({ donor: userId });

    res.status(200).json({ success: true, donations });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// org donations received
exports.org_donations = async (req, res) => {
  try {
    const organizationId = req.params.organizationId; // Extract organization ID from route parameters

    // Check if organization exists
    const organization = await User.findById(organizationId);

    
    if (!organization || organization.role !== 'organization') {
      return res.status(404).json({ error: 'Organization not found' });
    }

    const donations = await Donation.find({ organization: organizationId });

    res.status(200).json({ success: true, donations });
  } catch (error) {
    // Handle errors
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid organization ID' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};


// event received donations
exports.event_donations = async (req, res) => {
  try {
    const eventId = req.params.eventId; // Extract event ID from route parameters

    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const donations = await Donation.find({ event: eventId });

    res.status(200).json({ success: true, donations });
  } catch (error) {
    // Handle errors
    console.error(error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid event ID' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};


// money donation
exports.money_donation = async (req, res) => {
    try {
      const { organizationId, eventId, amount, paymentMethod, isAnonymous } = req.body;
  
      if (!organizationId && !eventId) {
        return res.status(400).json({ error: 'Organization ID or Event ID is required' });
      }
  
      if (!amount || amount <= 0) {
        return res.status(400).json({ error: 'Invalid donation amount' });
      }
  
      const donation = new Donation({
        amountDonation: amount,
        paymentMethod,
        isAnonymous,
        donor:"6544f9baeed3721e4513c03e",//req.user.id, 
        organization: organizationId,
        event: eventId,
      });
  
      await donation.save();
  
      res.status(201).json({ success: true, donation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
