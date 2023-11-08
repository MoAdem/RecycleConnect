import mongoose from 'mongoose';

const panierSchema = new mongoose.Schema({
  totalPanier: {
    type: Number,
    required: true,
  },
  etatPanier: {
    type: String,
    required: true,
  },
});

const Panier = mongoose.model('Panier', panierSchema);

export default Panier;
