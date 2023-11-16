import express from 'express';
import multer from 'multer';
import upload from '../middleware/multer.js';

import { CreateCategorie, 
        GetAllCategories, 
        GetCategorieById, 
        UpdateCategorie, 
        DeleteCategorie,
        SearchCategorieByNom,
        SortCategoriesByNomAsc} from '../controller/categorie.js';

const router = express.Router();
router
.route('/')
.post(upload.array('PhotoCategorie'),CreateCategorie)
.get(GetAllCategories);

router
.route('/search/:NomCategorie')
.get(SearchCategorieByNom);

router
.route('/sort')
.get(SortCategoriesByNomAsc);

router
.route('/:id')
.get(GetCategorieById)
.put(UpdateCategorie)
.delete(DeleteCategorie);


export default router;

