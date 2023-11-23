import express from 'express';
import { body } from 'express-validator';
import { addres, deleteOnceRess, getOnceRes, getress, updateres } from '../controller/ReservationPc.js';


const router = express.Router();
router
.route('/')
.post(addres)
.get(getress);

router
.route('/:_id')
.delete(deleteOnceRess)
.put(updateres)
.get(getOnceRes)


export default router ; 