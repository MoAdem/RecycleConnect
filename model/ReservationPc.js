import mongoose from "mongoose";
const {Schema,model,Types }=mongoose;

const reservationPcSchema= new Schema(
    {
          /*   id_r:{
            type: Types.ObjectId,
            ref:'Reservation',
            required:true
        },*/
        Nom_R:{
            type:String,
            required:true
        },
        id_Pc:{
            type: Types.ObjectId,
            red:'PointCollecte',
            required:true
        }

    },
    {
        timeseries:true
    }
);
export default model ('reservationPc',reservationPcSchema)
