import mongoose from "mongoose";
const {Schema,model,Types }=mongoose;

const reservationPcSchema= new Schema(
    {
        Nom_R:{
            type:String,
            required:true
        },
        id_Pc:{
            type: Types.ObjectId,
            red:'Livraison',
            required:true
        }

    },
    {
        timeseries:true
    }
);
export default model ('reservationPc',reservationPcSchema)
