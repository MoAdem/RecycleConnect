import express from 'express';
const router = express.Router();
import panierController from '../controller/Panier.js';

// Routes pour la gestion des paniers
router.post('/create', panierController.createPanier);
router.get('/', panierController.getAllPaniers);
router.get('/:panierId', panierController.getPanierById);
router.put('/:panierId', panierController.updatePanier);
router.delete('/:panierId', panierController.deletePanier);
export default router;
