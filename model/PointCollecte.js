import mongoose from "mongoose";
const {Schema,model}= mongoose;

const pointCollecteSchema= new Schema(
    {
        Nom_Pc:{
            type: String,
            required: true
        },
        address_mail_Pc:{
            type:String,
            required:true
        },
        address_Pc:{
            type:String,
            required:true
        },
        numero_tel:{
            type:Number,
            required:true
        },
        
        image:{
            type:String,
            required:true
        }
    },
    {
        timestamps: true
    }
);
export default model ('pointCollecte',pointCollecteSchema);