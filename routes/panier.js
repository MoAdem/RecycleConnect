import express from 'express';
const router = express.Router();
import panierController from '../controller/Panier.js';

/**
 * @swagger
 * tags:
 *   name: Paniers
 *   description: API for managing paniers
 */

/**
 * @swagger
 * /api/paniers/create:
 *   post:
 *     summary: Create a new panier
 *     tags: [Paniers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalPanier:
 *                 type: number
 *                 example: 100.5
 *               etatPanier:
 *                 type: string
 *                 example: "Active"
 *     responses:
 *       201:
 *         description: Panier created successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               panier:
 *                 _id: 60c12c4f3c1b7d001cc53458
 *                 totalPanier: 100.5
 *                 etatPanier: "Active"
 */

router.post('/create', panierController.createPanier);

/**
 * @swagger
 * /api/paniers/:
 *   get:
 *     summary: Retrieve all paniers
 *     tags: [Paniers]
 *     responses:
 *       200:
 *         description: Successfully retrieved paniers
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               paniers:
 *                 - _id: 60c12c4f3c1b7d001cc53458
 *                   totalPanier: 100.5
 *                   etatPanier: "Active"
 */

router.get('/', panierController.getAllPaniers);

/**
 * @swagger
 * /api/paniers/{panierId}:
 *   get:
 *     summary: Retrieve a panier by ID
 *     tags: [Paniers]
 *     parameters:
 *       - in: path
 *         name: panierId
 *         required: true
 *         schema:
 *           type: string
 *         description: Panier ID
 *     responses:
 *       200:
 *         description: Successfully retrieved the panier
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               panier:
 *                 _id: 60c12c4f3c1b7d001cc53458
 *                 totalPanier: 100.5
 *                 etatPanier: "Active"
 *       404:
 *         description: Panier not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Panier not found"
 */

router.get('/:panierId', panierController.getPanierById);

/**
 * @swagger
 * /api/paniers/{panierId}:
 *   put:
 *     summary: Update a panier by ID
 *     tags: [Paniers]
 *     parameters:
 *       - in: path
 *         name: panierId
 *         required: true
 *         schema:
 *           type: string
 *         description: Panier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalPanier:
 *                 type: number
 *                 example: 120.75
 *               etatPanier:
 *                 type: string
 *                 example: "Updated"
 *     responses:
 *       200:
 *         description: Panier updated successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               panier:
 *                 _id: 60c12c4f3c1b7d001cc53458
 *                 totalPanier: 120.75
 *                 etatPanier: "Updated"
 *       404:
 *         description: Panier not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Panier not found"
 */

router.put('/:panierId', panierController.updatePanier);

/**
 * @swagger
 * /api/paniers/{panierId}:
 *   delete:
 *     summary: Delete a panier by ID
 *     tags: [Paniers]
 *     parameters:
 *       - in: path
 *         name: panierId
 *         required: true
 *         schema:
 *           type: string
 *         description: Panier ID
 *     responses:
 *       200:
 *         description: Panier deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: "Panier deleted successfully"
 *       404:
 *         description: Panier not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Panier not found"
 */

router.delete('/:panierId', panierController.deletePanier);

/**
 * @swagger
 * /api/paniers/totalPaniersCount:
 *   get:
 *     summary: Get the total count of paniers
 *     tags: [Paniers]
 *     responses:
 *       200:
 *         description: Successfully retrieved the total count
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               totalPaniersCount: 5
 */

router.get('/totalPaniersCount', panierController.getTotalPaniersCount);

/**
 * @swagger
 * /api/paniers/searchByArticleName:
 *   get:
 *     summary: Search paniers by article name
 *     tags: [Paniers]
 *     parameters:
 *       - in: query
 *         name: articleName
 *         required: true
 *         schema:
 *           type: string
 *         description: Article name for searching paniers
 *     responses:
 *       200:
 *         description: Successfully retrieved paniers
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               paniers:
 *                 - _id: 60c12c4f3c1b7d001cc53458
 *                   totalPanier: 100.5
 *                   etatPanier: "Active"
 */

router.get('/searchByArticleName', panierController.searchPaniersByArticleName);

export default router;
