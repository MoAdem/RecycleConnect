import express from 'express';
import multer from 'multer';
import upload from '../middleware/multer.js';

import { createcategorie, 
        getAllCategories, 
        getcategorieById, 
        updatecategorie, 
        deletecategorie,
        searchCategorieByNom,
        sortCategoriesByNomAsc} from '../controller/categorie.js';

const router = express.Router();
router
.route('/')
.post(upload.array('PhotoCategorie'),createcategorie)
.get(getAllCategories);

router
.route('/search/:NomCategorie')
.get(searchCategorieByNom);

router
.route('/sort')
.get(sortCategoriesByNomAsc);

router
.route('/:id')
.get(getcategorieById)
.put(updatecategorie)
.delete(deletecategorie);


export default router;

