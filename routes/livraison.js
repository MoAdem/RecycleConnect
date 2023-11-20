import express from 'express';
import {body} from 'express-validator'
import { addliv, deleteAllliv, deleteOnceliv, deletelivraa, getOnceliv, getliv, updatedlivraa, updateliv, updatelivra} from '../controller/Livraison.js';


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
/*router
.route("/:_id")
.put(updatelivra);
*/
router.route("/:_id")
.put(updatedlivraa)
.delete(deletelivraa);


export default router;