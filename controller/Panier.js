import Panier from '../model/Panier.js';

// Créer un panier
const panierController = {
  createPanier: async (req, res) => {
    try {
      const { totalPanier, etatPanier } = req.body;

      if (typeof totalPanier !== 'number' || !etatPanier) {
        return res.status(400).json({ error: 'Missing or invalid fields' });
      }

      const panier = new Panier({
        totalPanier,
        etatPanier,
      });

      await panier.save();

      res.status(201).json({ success: true, panier });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Lire tous les paniers
  getAllPaniers: async (req, res) => {
    try {
      const paniers = await Panier.find();

      res.status(200).json({ success: true, paniers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Lire un panier par son ID
  getPanierById: async (req, res) => {
    try {
      const panierId = req.params.panierId;

      const panier = await Panier.findById(panierId);

      if (!panier) {
        return res.status(404).json({ error: 'Panier not found' });
      }

      res.status(200).json({ success: true, panier });
    } catch (error) {
      console.error(error);
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid panier ID' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Mettre à jour un panier
  updatePanier: async (req, res) => {
    try {
      const panierId = req.params.panierId;
      const updatedData = req.body;

      const panier = await Panier.findByIdAndUpdate(panierId, updatedData, {
        new: true,
      });

      if (!panier) {
        return res.status(404).json({ error: 'Panier not found' });
      }

      res.status(200).json({ success: true, panier });
    } catch (error) {
      console.error(error);
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid panier ID' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // Supprimer un panier
  deletePanier: async (req, res) => {
    try {
      const panierId = req.params.panierId;

      const result = await Panier.findByIdAndDelete(panierId);

      if (!result) {
        return res.status(404).json({ error: 'Panier not found' });
      }

      res.status(200).json({ success: true, message: 'Panier deleted successfully' });
    } catch (error) {
      console.error(error);
      if (error.name === 'CastError') {
        return res.status(400).json({ error: 'Invalid panier ID' });
      }
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

export default panierController;
