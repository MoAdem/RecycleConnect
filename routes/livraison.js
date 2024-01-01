import express from 'express';
import {body} from 'express-validator'
import { addliv, countLiv, deleteAllliv, deletelivraa, getOneLivraison, getliv, updatedlivraa} from '../controller/Livraison.js';
import { countAndShow, statliv } from '../controller/livreur.js';


const router = express.Router();
router.
route("/livraison_livree")
.post(
    body("idLivraison").notEmpty(),
    body("etat").isBoolean(),
    statliv
  )
  .get(countAndShow);
  router
.route("/countLiv")
.get(countLiv);
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