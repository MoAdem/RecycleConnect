import express from 'express';
import { body } from 'express-validator'
import multer from '../middleware/multer-config.js';
import { addPc, deleteAllPc, deleteOncePc, getOncePc, getPc, updatePcByName } from '../controller/PointCollecte.js';



const router = express.Router();

router
.route('/')
.post(multer,
//body("address_mail_Pc").isEmail() ,
//body("numero_tel").isLength({min:8, max:8}),
addPc)
.get(getPc)
.delete(deleteAllPc)

router
.route("/:Nom_Pc")
.get(getOncePc)
.put(multer,updatePcByName)
.delete(deleteOncePc);




export default router;