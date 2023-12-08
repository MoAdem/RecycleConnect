import Categorie from '../model/categorie.js';
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary';


export async function CreateCategorie(req, res) {
const { NomCategorie, NbreTotalArticles } = req.body;
if (!NomCategorie || !NbreTotalArticles) {
return res.status(400).json({ error: "Champs vides !" });
}
if (NbreTotalArticles < 0) {
return res.status(400).json({ error: "Nombre d'Categories négatif !" });
}
const existingCategory = await Categorie.findOne({ NomCategorie });
if (existingCategory) {
return res.status(400).json({ error: "Cette catégorie existe déjà !" });
}
try {
if (!req.file) {
return res.status(400).json({ error: 'Aucune photo fournie !' });
}
const cloudinaryResponse = await cloudinary.uploader.upload(
`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
);
const photo = cloudinaryResponse.secure_url;
const nouvcategorie = await Categorie.create({
PhotoCategorie: photo,
NomCategorie: req.body.NomCategorie,
NbreTotalArticles: req.body.NbreTotalArticles,
});
SendMail(
'mariem.marsaoui@esprit.tn',
'Important de la part de RecycleConnect',
'',
'De nouvelles Catégories ont été ajoutées ! <br> Pour plus de détails, visitez notre plateforme !'
);
return res.status(200).json(nouvcategorie);
} catch (error) {
console.error(error);
return res.status(500).json({ error: "Erreur dans la creation de la categorie" });
}
}


async function SendMail(to, subject, text, html)
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
const info = await transporter.sendMail(mailOptions);
console.log('Email sent: ' + info.messageId);
} catch (error) {
console.error('Error sending email:', error);
}
}



export async function GetAllCategories(req, res) {
try {
const categories = await Categorie.find();
res.status(200).json(categories);
} catch (error) {
res.status(400).json({ error: 'Erreur de l affichage de toutes categories' });
}
}

export async function GetCategorieById (req, res) {
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

export async function UpdateCategorie(req, res) {
  const { NomCategorie, NbreTotalArticles } = req.body;
  if ( !NomCategorie || !NbreTotalArticles) {
    return res.status(400).json({ error: "Champs vides !" });
  }
  if (NbreTotalArticles < 0) {
    return res.status(400).json({ error: "Nombre d'Categories négatif !" });
  }
  try {
    const existingCategory = await Categorie.findById(req.params.id);
    if (!existingCategory) {
      return res.status(400).json({ error: "Cette catégorie n'existe pas." });
    }
    if (req.file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
      );
      existingCategory.PhotoCategorie = cloudinaryResponse.secure_url;
    }
    existingCategory.NomCategorie = NomCategorie;
    existingCategory.NbreTotalArticles = NbreTotalArticles;

    const updatedCategory = await existingCategory.save();
    return res.status(200).json(updatedCategory);
  } catch (error) {
    return res.status(400).json({ error: error.message || "Erreur de modification de la categorie" });
  }
}


export async function DeleteCategorie (req, res) {
try {
const categorie = await Categorie.findByIdAndRemove(req.params.id);
res.json({ message: 'categorie supprimée' });
}
catch(error){ res.status(400).json({ error: 'Erreur de la suppression de la categorie' });}
}




export const SearchCategorieByNom = async (req, res) => {
try {
const nomCategorie = req.params.NomCategorie.trim();
//console.log('NomCategorie:', nomCategorie);
const specialNomCategorie = nomCategorie.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
const categorie = await Categorie.findOne({ NomCategorie: { $regex: new RegExp(specialNomCategorie, 'i') },
});
//console.log('Found Categorie:', categorie);
return res.status(200).json({ categorie });
} catch (error) {
return res.status(400).json({ error: error.message || "Erreur !" });
}
}


export const SortCategoriesByNomAsc = async (req, res) => {
try {
const categories = await Categorie.find().sort({ NomCategorie: 1 });
return res.status(200).json({ categories });
} catch (error) {
return res.status(400).json({ message: 'Erreur !' });
}
}




