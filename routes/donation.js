const express = require('express');
const router = express.Router();
const donation_controller = require('../controller/Donation')
//merg
// routes
router.post('/item', donation_controller.item_donation)
router.post('/money', donation_controller.money_donation)
router.get('/user',donation_controller.user_donations)
router.get('/org/:organizationId',donation_controller.org_donations)
router.get('/event/:eventId',donation_controller.event_donations)

module.exports = router;
