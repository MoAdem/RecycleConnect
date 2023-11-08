import express from 'express';
import { body } from 'express-validator';
import { verfi } from '../controller/VerifierProduit.js';

const router = express.Router();
router
.route('/')
.post(verfi);
export default router;