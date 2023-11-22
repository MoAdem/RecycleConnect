import mongoose from "mongoose";
const {Schema,model,Types }=mongoose;

const livraisonSchema = new Schema(
    {
        /* id_res:{
            type: Types.ObjectId,
            ref:'Reservation',
            required:true
        },*/

        Nom_Article:{
            type:String,
            required:true
        },
        Nom_Client:{
            type:String,
            required:true
        } ,
        address_mail_Client:{
            type:String,
            required:true
        },

        numero_Client:{
            type:Number,
            required:true
        },
        ville:{
            type:String,
            required:true
        },
        address_Client:{
            type:String,
            required:true
        },
    },
    {
        timestamps:true
    }
);
export default model ('livraison',livraisonSchema)