import express from 'express';
const router = express.Router();
import reservationController from '../controller/Reservation.js';

/**
 * @swagger
 * tags:
 *   name: Reservations
 *   description: API for managing reservations
 */

/**
 * @swagger
 * /api/reservations/create:
 *   post:
 *     summary: Create a new reservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateReservation:
 *                 type: string
 *                 format: date
 *                 example: "2023-11-06"
 *               dateLivraison:
 *                 type: string
 *                 format: date
 *                 example: "2023-11-10"
 *               commentaire:
 *                 type: string
 *               lieuReservation:
 *                 type: string
 *               etatReservation:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reservation created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               reservation:
 *                 _id: 60c12c4f3c1b7d001cc53458
 *                 dateReservation: "2023-11-06"
 *                 dateLivraison: "2023-11-10"
 *                 commentaire: "Sample Comment"
 *                 lieuReservation: "Sample Location"
 *                 etatReservation: "Confirmed"
 */

router.post('/create', reservationController.createReservation);

/**
 * @swagger
 * /api/reservations/:
 *   get:
 *     summary: Retrieve all reservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: Successfully retrieved reservations
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               reservations:
 *                 - _id: 60c12c4f3c1b7d001cc53458
 *                   dateReservation: "2023-11-06"
 *                   dateLivraison: "2023-11-10"
 *                   commentaire: "Sample Comment"
 *                   lieuReservation: "Sample Location"
 *                   etatReservation: "Confirmed"
 */

router.get('/', reservationController.getAllReservations);

/**
 * @swagger
 * /api/reservations/{reservationId}:
 *   get:
 *     summary: Retrieve a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the reservation
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               reservation:
 *                 _id: 60c12c4f3c1b7d001cc53458
 *                 dateReservation: "2023-11-06"
 *                 dateLivraison: "2023-11-10"
 *                 commentaire: "Sample Comment"
 *                 lieuReservation: "Sample Location"
 *                 etatReservation: "Confirmed"
 *       404:
 *         description: Reservation not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Reservation not found"
 */

router.get('/:reservationId', reservationController.getReservationById);

/**
 * @swagger
 * /api/reservations/{reservationId}:
 *   put:
 *     summary: Update a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dateReservation:
 *                 type: string
 *                 format: date
 *                 example: "2023-11-07"
 *               dateLivraison:
 *                 type: string
 *                 format: date
 *                 example: "2023-11-11"
 *               commentaire:
 *                 type: string
 *               lieuReservation:
 *                 type: string
 *               etatReservation:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reservation updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               reservation:
 *                 _id: 60c12c4f3c1b7d001cc53458
 *                 dateReservation: "2023-11-07"
 *                 dateLivraison: "2023-11-11"
 *                 commentaire: "Updated Comment"
 *                 lieuReservation: "Updated Location"
 *                 etatReservation: "Updated"
 *       404:
 *         description: Reservation not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Reservation not found"
 */

router.put('/:reservationId', reservationController.updateReservation);

/**
 * @swagger
 * /api/reservations/{reservationId}:
 *   delete:
 *     summary: Delete a reservation by ID
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: reservationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Reservation ID
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Reservation deleted successfully"
 *       404:
 *         description: Reservation not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Reservation not found"
 */

router.delete('/:reservationId', reservationController.deleteReservation);

export default router;
