const express = require('express');
const router = express.Router();
const article = require('../controller/article');
const upload = require('../middleware/multer');

router.post('/',upload.array('PhotoArticle'), article.createArticle);
router.get('/', article.getAllArticles);
router.get('/:id', article.getArticleById);
router.put('/:id', article.updateArticle);
router.delete('/:id', article.deleteArticle);

module.exports = router;
