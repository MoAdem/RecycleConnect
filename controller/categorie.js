import Categorie from '../model/categorie.js';


/* export function createcategorie (req, res)
{
     const { NomCategorie, NbreTotalArticles } = req.body;
    
    if (!NomCategorie || !NbreTotalArticles) 
    {
      res.status(400).json({ error: 'Champs vides !' });
    }

    if (NbreTotalArticles < 0) 
    {
      res.status(400).json({ error: 'Nombre d\'articles négatif !' });
    }

    Categorie.create({
      NomCategorie: req.body.NomCategorie,
      NbreTotalArticles: req.body.NbreTotalArticles
    })
      .then((nouvcategorie) => {
        res.status(200).json(nouvcategorie);
      })
      .catch(res.status(400).json({ error: 'Erreur dans la creation de la categorie' }))
    
}
 */

export async function createcategorie(req, res) {
  const { NomCategorie, NbreTotalArticles } = req.body;
 
  if (!NomCategorie || !NbreTotalArticles) 
  {
     return res.status(400).json({ error: "Champs vides !" });
  }
 
  if (NbreTotalArticles < 0) 
  {
     return res.status(400).json({ error: "Nombre d'articles négatif !" });
  }
 
  const existingCategory = await Categorie.findOne({ NomCategorie });
 
  if (existingCategory) {
     return res.status(400).json({ error: "Cette catégorie existe déjà !" });
  }
 
  try {
     const nouvcategorie = await Categorie.create({
       NomCategorie: req.body.NomCategorie,
       NbreTotalArticles: req.body.NbreTotalArticles,
     });
     return res.status(200).json(nouvcategorie);
  } catch (error) {
     return res.status(400).json({ error: "Erreur dans la creation de la categorie" });
  }
 }


/* export async function getAllCategories (req, res) {
  Categorie.find()
  .then((categories) => { res.status(200).json(categories); })
  .catch(res.status(400).json({ error: 'Erreur de l affichage de toutes categories'}))
} */

export async function getAllCategories(req, res) {
  try {
     const categories = await Categorie.find();
     res.status(200).json(categories);
  } catch (error) {
     res.status(400).json({ error: 'Erreur de l affichage de toutes categories' });
  }
 }

export async function getcategorieById (req, res) {
  try {
  const categorie = await Categorie.findById(req.params.id)
   res.status(200).json(categorie); 
  } catch (error) {
   res.status(400).json({ error: 'Erreur de l affichage de la categorie'});
  }
}



/* export function updatecategorie (req, res) {
  Categorie.findByIdAndUpdate(req.params.id)
  .then((categorie) => { res.status(200).json(categorie); })
  .catch(res.status(400).json({ error: 'Erreur de modification de la categorie' }))
}
 */

export async function updatecategorie(req, res) {
  const { NomCategorie, NbreTotalArticles } = req.body;
 
  if (!NomCategorie || !NbreTotalArticles) {
     return res.status(400).json({ error: "Champs vides !" });
  }
 
  if (NbreTotalArticles < 0) {
     return res.status(400).json({ error: "Nombre d'articles négatif !" });
  }
 
  try {
     const existingCategory = await Categorie.findById(req.params.id);
     if (!existingCategory) {
       return res.status(400).json({ error: "Cette catégorie n'existe pas." });
     }
 
     existingCategory.NomCategorie = NomCategorie;
     existingCategory.NbreTotalArticles = NbreTotalArticles;
 
     const updatedCategory = await existingCategory.save();
     return res.status(200).json(updatedCategory);
  } catch (error) {
     return res.status(400).json({ error: error.message || "Erreur de modification de la categorie" });
  }
 }





export async function deletecategorie (req, res) {
  try {
  const categorie = await Categorie.findByIdAndRemove(req.params.id);
  res.json({ message: 'categorie supprimée' });
  }
  catch(error){ res.status(400).json({ error: 'Erreur de la suppression de la categorie' });}
}