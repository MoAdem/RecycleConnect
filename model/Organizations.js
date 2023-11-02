const mongoose = require("mongoose")

const organizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: String,
    contactEmail: String,
    address: String,
    phone: String, 	
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    
  });

  const Organization = mongoose.model("Organization", organizationSchema)
  module.exports = Organization