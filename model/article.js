import mongoose from "mongoose";
const {Schema,model}=mongoose;


const articleSchema = new Schema({
  PhotosArticle: [],
  NomArticle: String,
  DescriptionArticle: String,
  EtatArticle: String,
  Categorie: { type: Schema.Types.ObjectId, ref: 'Categorie' },
});

export default model ('Article', articleSchema);
