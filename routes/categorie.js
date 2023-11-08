const express = require('express');
const router = express.Router();
const categorie = require('../controller/categorie');

router.post('/', categorie.createcategorie);
router.get('/', categorie.getAllCategories);
router.get('/:id', categorie.getcategorieById);
router.put('/:id', categorie.updatecategorie);
router.delete('/:id', categorie.deletecategorie);

module.exports = router;

