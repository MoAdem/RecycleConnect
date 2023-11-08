import express from 'express';
const router = express.Router();
import donationController from '../controller/Donation.js';

// routes
router.post('/item', donationController.item_donation);
router.post('/money', donationController.money_donation);
router.get('/user', donationController.user_donations);
router.get('/org/:organizationId', donationController.org_donations);
router.get('/event/:eventId', donationController.event_donations);

export default router;
