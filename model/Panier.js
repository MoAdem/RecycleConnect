const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const panierSchema = mongoose.Schema({
  totalPanier: {
    type: Number,
    required: true,
  },
  etatPanier: {
    type: String,
    required: true,
  },
 
});

module.exports = mongoose.model("Panier", panierSchema);
