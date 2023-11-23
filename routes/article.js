import express from 'express';
import multer from 'multer';
import upload from '../middleware/multer.js';

import { CreateArticle, 
         GetAllArticles, 
         GetArticleById, 
         UpdateArticle, 
         DeleteArticle,
        SearchArticleByNom,
        SortArticlesByNomAsc } from '../controller/article.js'; 


const router = express.Router();

router
.route('/')
.post(upload.single('PhotoArticle'),CreateArticle)
.get(GetAllArticles);

router
.route('/search/:NomArticle')
.get(SearchArticleByNom);

router
.route('/sort')
.get(SortArticlesByNomAsc);

router
.route('/:id')
.get(GetArticleById)
.put(UpdateArticle)
.delete(DeleteArticle);


export default router;