const categorie = require('../model/categorie');


exports.createcategorie = async (req, res) => {
  try {
    const { NomCategorie, NbreTotalArticles } = req.body;
    
    if (!NomCategorie || !NbreTotalArticles) {
      return res.status(400).json({ error: 'Champs vides !' });
    }

    if (NbreTotalArticles < 0) {
      return res.status(400).json({ error: 'Nombre d\'articles négatif !' });
    }

    const newCategorie = new categorie({ NomCategorie, NbreTotalArticles }); 
    await newCategorie.save();
    res.json(newCategorie);
  } catch (error) {
    res.status(500).json({ error: 'Error creating category' });
  }
};



exports.getAllCategories = async (req, res) => {
  try {
    const categories = await categorie.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Error getting categories' });
  }
};

// Get a single categorie by ID
exports.getcategorieById = async (req, res) => {
  try {
    const categorie = await categorie.findById(req.params.id);
    res.json(categorie);
  } catch (error) {
    res.status(500).json({ error: 'Error getting categorie' });
  }
};


exports.updatecategorie = async (req, res) => {
  try {
    await categorie.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'categorie updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating categorie' });
  }
};


exports.deletecategorie = async (req, res) => {
  try {
    await categorie.findByIdAndRemove(req.params.id);
    res.json({ message: 'categorie deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting categorie' });
  }
};
