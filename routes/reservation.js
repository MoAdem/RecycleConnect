const express = require('express');
const router = express.Router();
const reservationController = require('../controller/Reservation');

// Routes pour la gestion des réservations
router.post('/create', reservationController.createReservation);
router.get('/', reservationController.getAllReservations);
router.get('/:reservationId', reservationController.getReservationById);
router.put('/:reservationId', reservationController.updateReservation);
router.delete('/:reservationId', reservationController.deleteReservation);

module.exports = router;
