/*import mongoose from "mongoose";
const {Schema,model,Types }=mongoose;
const verifierProduitSchema= new Schema(
    {
        etat_P:{
            type:String,
            required:true
        },
        id_liv:{
            type: Types.ObjectId,
            ref:'livraison',
            required:true
        }
    },
    {
        timestamps:true
    }
);
export default model ('verifierProduit',verifierProduitSchema)*/