import Article from "../model/article.js";
import nodemailer from 'nodemailer';
import { v2 as cloudinary } from 'cloudinary';


export async function CreateArticle(req, res) {
const { NomArticle, DescriptionArticle, EtatArticle, CategorieId } = req.body;

if (!NomArticle || !DescriptionArticle || !EtatArticle || !CategorieId) {
return res.status(400).json({ error: 'Champs vides!' });}

try {
if (!req.file) {
return res.status(400).json({ error: 'Auncune photo jointe!' });
}

const cloudinaryResponse = await cloudinary.uploader.upload(
`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
);

const photo = cloudinaryResponse.secure_url;

const nouvArticle = await Article.create({
PhotoArticle: photo,
NomArticle,
DescriptionArticle,
EtatArticle,
Categorie: CategorieId,
});
const htmlString = `
<body style='font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 0;'>
  <table width='100%' cellpadding='0' style='max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 4px rgba(0,0,0,0.1);'>
    <tr>
      <td style='padding: 20px;'>
        <h2 style='color: #333;'>Bonne nouvelle!</h2>
        <p>De nouveaux articles sont disponibles!</p>
        <p>Pour plus de détails consulter notre plateforme.</p>
      </td>
    </tr>
  </table>
</body>
`;
SendMail(
'mariem.marsaoui@esprit.tn',
'Important de la part de RecycleConnect',
'',
htmlString
);

res.status(200).json(nouvArticle);
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Erreur dans la creation d article' });
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




export async function GetAllArticles(req, res) {
try {
const articles = await Article.find();
res.status(200).json(articles);
} catch (error) {
res.status(400).json({ error: 'Erreur de l affichage de tous les articles' });
}
}




export async function GetArticleById(req, res){
try {
const article = await Article.findById(req.params.id);
res.status(200).json(article);
} catch (error) {
res.status(400).json({ error: 'Erreur de l affichage de l article'});
}
}


export async function UpdateArticle(req, res) {
  try {
    const existingArticle = await Article.findById(req.params.id);
    if (!existingArticle) {
      return res.status(400).json({ error: "Cet article n'existe pas." });
    }
    if (req.file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
      );
      existingArticle.PhotoArticle = cloudinaryResponse.secure_url;
    }
    existingArticle.NomArticle = req.body.NomArticle;
    existingArticle.DescriptionArticle = req.body.DescriptionArticle;
    existingArticle.EtatArticle = req.body.EtatArticle;
    existingArticle.Categorie = req.body.CategorieId;
    const updatedArticle = await existingArticle.save();
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(400).json({ error: error.message || 'Erreur de modification de l article' });
  }
}





export async function DeleteArticle (req, res){
try {
const article = await Article.findByIdAndRemove(req.params.id);
res.json({ message: 'Article supprimé' });
}catch(error) {
res.status(400).json({ error: 'Erreur de la suppression de l article' });
}
}


export const SearchArticleByNom = async (req, res) => {
try {
const nomArticle = req.params.NomArticle.trim();
//console.log('NomArticle:', nomArticle);
const specialNomArticle = nomArticle.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
const articles = await Article.find({ NomArticle: { $regex: new RegExp(specialNomArticle, 'i') },
});
//console.log('Found Article:', article);
return res.status(200).json({ articles });
} catch (error) {
return res.status(400).json({ error: error.message || "Erreur !" });
}
}


export const SortArticlesByNomAsc = async (req, res) => {
try {
const articles = await Article.find().sort({ NomArticle: 1 });
return res.status(200).json({ articles });
} catch (error) {
return res.status(400).json({ message: 'Erreur !' });
}
}



