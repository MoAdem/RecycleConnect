import Categorie from '../model/categorie.js';
import nodemailer from 'nodemailer';


export async function createcategorie(req, res) {
  const { NomCategorie, NbreTotalCategories } = req.body;
 
  if (!NomCategorie || !NbreTotalCategories) 
  {
     return res.status(400).json({ error: "Champs vides !" });
  }
 
  if (NbreTotalCategories < 0) 
  {
     return res.status(400).json({ error: "Nombre d'Categories négatif !" });
  }
 
  const existingCategory = await Categorie.findOne({ NomCategorie });
 
  if (existingCategory) {
     return res.status(400).json({ error: "Cette catégorie existe déjà !" });
  }
  
  const photos = null;
  //req.files.map((file) => req.protocol + "://" + req.get("host") + "/uploads/" + file.filename);
  try {
     const nouvcategorie = await Categorie.create({
       PhotoCategorie: photos,
       NomCategorie: req.body.NomCategorie,
       NbreTotalCategories: req.body.NbreTotalCategories,
     });
     sendMail('mariem.marsaoui@esprit.tn', 
    'Important de la part de RecycleConnect', 
    '','De nouvelles Catégorie ont été ajoutés ! <br> Pour plus de détails, visiter notre plateforme !');
     return res.status(200).json(nouvcategorie);
  } catch (error) {
     return res.status(400).json({ error: "Erreur dans la creation de la categorie" });
  }
 }

 async function sendMail(to, subject, text, html) 
{
  try {
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'bouguerrahanine4@gmail.com',
              pass: 'ztpx ozpt ypbf jleo'
          }
      });
      const mailOptions = {
          from: 'bouguerrahanine4@gmail.com',
          to: to,
          subject: subject,
          text: text,
          html: html
      };

      // Envoi de l'e-mail
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.messageId);
  } catch (error) {
      console.error('Error sending email:', error);
  }
}



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
  const { NomCategorie, NbreTotalCategories } = req.body;
 
  if (!NomCategorie || !NbreTotalCategories) {
     return res.status(400).json({ error: "Champs vides !" });
  }
 
  if (NbreTotalCategories < 0) {
     return res.status(400).json({ error: "Nombre d'Categories négatif !" });
  }
 
  try {
     const existingCategory = await Categorie.findById(req.params.id);
     if (!existingCategory) {
       return res.status(400).json({ error: "Cette catégorie n'existe pas." });
     }
     existingCategory.PhotoCategorie = req.files.map(
      (file) => req.protocol + "://" + req.get("host") + "/uploads/" + file.filename);
     existingCategory.NomCategorie = NomCategorie;
     existingCategory.NbreTotalCategories = NbreTotalCategories;
 
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


export const searchCategorieByNom = async (req, res) => {
   try {
      const nomCategorie = req.params.NomCategorie.trim();
    //console.log('NomCategorie:', nomCategorie);
    const specialNomCategorie = nomCategorie.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const categorie = await Categorie.findOne({ NomCategorie: { $regex: new RegExp(specialNomCategorie, 'i') },
   });
   //console.log('Found Categorie:', categprie);
      return res.status(200).json({ categorie });
   } catch (error) {
      return res.status(400).json({ error: error.message || "Erreur !" });
   }
 }

 export const sortCategoriesByNomAsc = async (req, res) => {
   try {
     const categories = await Categorie.find().sort({ NomCategorie: 1 });
     return res.status(200).json({ categories });
   } catch (error) {
     return res.status(400).json({ message: 'Erreur !' });
   }
 }