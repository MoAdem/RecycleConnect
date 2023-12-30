import mongoose from "mongoose";

const { Schema, model } = mongoose;

const livreurSchema = new Schema(
  {
    idLivraison: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Livraison',
      required: true,
    },
    etat: {
      type: Boolean,
      default: false, // Assuming false means not delivered and true means delivered
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('livreur', livreurSchema);

