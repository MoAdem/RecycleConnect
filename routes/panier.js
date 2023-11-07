const express = require('express');
const router = express.Router();
const panierController = require('../controller/Panier');

// Routes pour la gestion des paniers
router.post('/create', panierController.createPanier);
router.get('/', panierController.getAllPaniers);
router.get('/:panierId', panierController.getPanierById);
router.put('/:panierId', panierController.updatePanier);
router.delete('/:panierId', panierController.deletePanier);

module.exports = router;
