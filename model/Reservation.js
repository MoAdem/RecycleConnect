import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
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

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
