import express from 'express';
import {body} from 'express-validator'
import { addliv, deleteAllliv, deletelivraa, getOneLivraison, getliv, updatedlivraa} from '../controller/Livraison.js';


const router = express.Router();
router
.route('/')
.post(addliv)
.delete(deleteAllliv)
.get(getliv);


/*router
.route("/:Nom_Client")
.get(getOnceliv)
.delete(deleteOnceliv)
.put(updateliv);
*/
router.route("/:_id")
.put(updatedlivraa)
.delete(deletelivraa)
.get(getOneLivraison)


export default router;