import express from 'express';
import { createcategorie, 
        getAllCategories, 
        getcategorieById, 
        updatecategorie, 
        deletecategorie} from '../controller/categorie.js';

const router = express.Router();
router
.route('/')
.post(createcategorie)
.get(getAllCategories);

router
.route('/:id')
.get(getcategorieById)
.put(updatecategorie)
.delete(deletecategorie);


export default router;
