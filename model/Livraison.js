import mongoose from "mongoose";
const {Schema,model,Types }=mongoose;

const livraisonSchema = new Schema(
    {
        Nom_Client:{
            type:String,
            required:true
        } ,
        address_mail_Client:{
            type:String,
            required:true
        },
        address_Client:{
            type:String,
            required:true
        },
        numero_Client:{
            type:Number,
            required:true
        },
        code_postal:{
            type:Number,
            required:true
        },
        id_Pc:{
            type: Types.ObjectId,
            ref:'pointCollecte',
            required:true
        }
    },
    {
        timestamps:true
    }
);
export default model ('livraison',livraisonSchema)