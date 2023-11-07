const Article = require('../model/Article');


exports.createArticle = async (req, res) => {
  try {
    const { NomArticle, DescriptionArticle, EtatArticle, CategorieId } = req.body;

    if (!NomArticle || !DescriptionArticle || !EtatArticle || !CategorieId) {
      return res.status(400).json({ error: 'Champs vides !' });
    } 

    const photos = req.files.map(
      (file) =>
          req.protocol + "://" + req.get("host") + "/uploads/" + file.filename
      );
    const newArticle = new Article
    ({PhotoArticle: photos, 
      NomArticle, 
      DescriptionArticle, 
      EtatArticle, 
      Categorie: CategorieId});
    await newArticle.save();
    res.json(newArticle);
  } catch (error) {
    res.status(500).json({ error: 'Error creating article' });
  }
};

// Get all articles
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Error getting articles' });
  }
};

// Get a single article by ID
exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Error getting article' });
  }
};

// Update an article by ID
exports.updateArticle = async (req, res) => {
  try {
    await Article.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Article updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating article' });
  }
};

// Delete an article by ID
exports.deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndRemove(req.params.id);
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting article' });
  }
};
