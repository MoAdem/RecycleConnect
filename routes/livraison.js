import express from 'express';
import {body} from 'express-validator'
import { addliv, deleteAllliv, deleteOnceliv, getOnceliv, getliv, updateliv } from '../controller/Livraison.js';

const router = express.Router();
router
.route('/')
.post(addliv)
.get(getliv)
.delete(deleteAllliv);

router
.route("/:Nom_Client")
.get(getOnceliv)
.delete(deleteOnceliv)
.put(updateliv)

export default router;