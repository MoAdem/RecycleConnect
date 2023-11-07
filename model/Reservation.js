const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservationSchema = mongoose.Schema({
  dateReservation: {
    type: Date,
    required: true,
  },
  dateLivraison: {
    type: Date,
    required: true,
  },
  commentaire: String,
  lieuReservation: {
    type: String,
    required: true,
  },
  etatReservation: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model("Reservation", reservationSchema);
