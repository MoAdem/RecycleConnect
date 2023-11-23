import mongoose from "mongoose";
const {Schema,model}= mongoose;

const categorieSchema = new Schema({
  PhotoCategorie: String,
  NomCategorie: 
  {type: String,
  unique: true,},
  NbreTotalArticles: Number,
});

export default model('Categorie', categorieSchema);