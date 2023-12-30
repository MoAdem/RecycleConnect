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
        
       /* image:{
            type:String,
            required:true
        },*/
        
        x:{
            type:Number,
            required:true,
        },
        y:{
            type:Number,
            required:true,
        },
    },
    {
        timestamps: true
    }
);
pointCollecteSchema.statics.countReservationsPc = function (pointCollecteId) {
    return ReservationPc.countDocuments({ id_Pc: pointCollecteId });
};
export default model ('pointCollecte',pointCollecteSchema);