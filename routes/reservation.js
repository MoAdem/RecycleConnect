import express from 'express';
const router = express.Router();
import reservationController from '../controller/Reservation.js';

// Routes pour la gestion des réservations
router.post('/create', reservationController.createReservation);
router.get('/', reservationController.getAllReservations);
router.get('/:reservationId', reservationController.getReservationById);
router.put('/:reservationId', reservationController.updateReservation);
router.delete('/:reservationId', reservationController.deleteReservation);
router.get('/:reservationId/generateQRCode', reservationController.generateQRCode);
export default router;

