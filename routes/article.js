import express from 'express';
import multer from 'multer';
import upload from '../middleware/multer.js';

import { createArticle, 
         getAllArticles, 
         getArticleById, 
         updateArticle, 
         deleteArticle,
        searchArticleByNom,
        sortArticlesByNomAsc } from '../controller/article.js'; 


const router = express.Router();

router
.route('/')
.post(upload.array('PhotosArticle'),createArticle)
.get(getAllArticles);

router
.route('/search/:NomArticle')
.get(searchArticleByNom);

router
.route('/sort')
.get(sortArticlesByNomAsc);

router
.route('/:id')
.get(getArticleById)
.put(updateArticle)
.delete(deleteArticle);


export default router;
