import express from 'express';
import { body } from 'express-validator'
import multer from '../middleware/multer-config.js';
import { InactivePc, UpdatePoint, actif, addPc, countTotalPc, deleteAllPc, deleteOnePoint, getOncePc, getPc} from '../controller/PointCollecte.js';



const router = express.Router();
router
.route('/countTotalPc')
.get(countTotalPc);
router
.route('/countInactivePoints')
.get(InactivePc);
router
.route('/ActifPoints')
.get(actif);
router
.route('/')
.post(
body("address_mail_Pc").isEmail() ,
body("numero_tel").isLength({min:8, max:8}),
addPc)
.get(getPc)
.delete(deleteAllPc)
/*router
.route("/:Nom_Pc")
//.get(getOncePc)
.put(multer,updatePcByName)
.delete(deleteOncePc);*/
router
.route("/:_id")
.get(getOncePc)
.delete(deleteOnePoint)
.put(
body("address_mail_Pc").isEmail() ,
body("numero_tel").isLength({min:8, max:8}),
UpdatePoint)



export default router;