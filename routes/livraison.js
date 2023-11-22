import express from 'express';
import {body} from 'express-validator'
import { addliv, deleteAllliv, deletelivraa, getOneLivraison, getliv, updatedlivraa} from '../controller/Livraison.js';


const router = express.Router();
router
.route('/')
.post(
body("address_mail_Client").isEmail() ,
body("numero_Client").isLength({min:8, max:8}), 
addliv)
.delete(deleteAllliv)
.get(getliv);


/*router
.route("/:Nom_Client")
.get(getOnceliv)
.delete(deleteOnceliv)
.put(updateliv);
*/
router.route("/:_id")
.put(
body("address_mail_Client").isEmail() ,
body("numero_Client").isLength({min:8, max:8}),
updatedlivraa)
.delete(deletelivraa)
.get(getOneLivraison)


export default router;