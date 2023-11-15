import express from 'express';
import multer from 'multer';
import upload from '../middleware/multer.js';

import { createArticle, 
         getAllArticles, 
         getArticleById, 
         updateArticle, 
         deleteArticle } from '../controller/article.js'; 


const router = express.Router();

router
.route('/')
.post(upload.array('PhotoArticle'),createArticle)
.get(getAllArticles);


router
.route('/:id')
.get(getArticleById)
.put(updateArticle)
.delete(deleteArticle);


export default router;