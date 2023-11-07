const mongoose = require('mongoose');
const Schema = mongoose.Schema
const articleSchema = new mongoose.Schema({
  PhotoArticle: String,
  NomArticle: String,
  DescriptionArticle: String,
  EtatArticle: String,
  Categorie: { type: Schema.Types.ObjectId, ref: 'Categorie' },
});

module.exports = mongoose.model('Article', articleSchema);
