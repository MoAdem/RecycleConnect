const express = require('express');
const router = express.Router();
const article = require('../controller/article');

router.post('/', article.createArticle);
router.get('/', article.getAllArticles);
router.get('/:id', article.getArticleById);
router.put('/:id', article.updateArticle);
router.delete('/:id', article.deleteArticle);

module.exports = router;
