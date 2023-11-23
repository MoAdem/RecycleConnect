import mongoose from "mongoose";
const {Schema,model,Types}=mongoose;


const articleSchema = new Schema({
  PhotoArticle: String,
  NomArticle: String,
  DescriptionArticle: String,
  EtatArticle: String,
  Categorie: { type: Schema.Types.ObjectId, ref: 'Categorie' },
});

export default model ('Article', articleSchema);