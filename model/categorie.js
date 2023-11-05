const mongoose = require('mongoose');
const Schema = mongoose.Schema
const categorieSchema = new mongoose.Schema({
  NomCategorie: String,
  NbreTotalArticles: Number,
});

module.exports = mongoose.model('Categorie', categorieSchema);
