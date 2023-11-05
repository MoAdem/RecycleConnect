const express = require('express');
const app = express();

// Configuration des middlewares
app.use(express.json()); // Middleware pour traiter les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Middleware pour traiter les données de formulaire
app.use(express.static('public')); // Middleware pour servir des fichiers statiques (par exemple, des fichiers CSS, des images)

// Configuration des routes
const articleRoutes = require('./routes/article');
const categorieRoutes = require('./routes/categorie');

app.use('/api/articles', articleRoutes); // Utilisation des routes d'articles
app.use('/api/categories', categorieRoutes); // Utilisation des routes de catégories

// Configuration de la base de données (connexion à MongoDB, par exemple)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configuration du port du serveur
const port = process.env.PORT || 3000;

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
