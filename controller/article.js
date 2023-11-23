import Article from "../model/article.js";
import nodemailer from 'nodemailer';


export async function CreateArticle(req, res) {
 const { NomArticle, DescriptionArticle, EtatArticle, CategorieId } = req.body;

 if (!NomArticle || !DescriptionArticle || !EtatArticle || !CategorieId) {
    res.status(400).json({ error: 'Champs vides !' });
 }

 const photo = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;

 const nouvArticle = await Article.create
    ({PhotoArticle: photo, 
      NomArticle,
      DescriptionArticle, 
      EtatArticle, 
      Categorie: CategorieId})
    .catch(err => { 
      res.status(400).json({ error: 'Erreur dans la creation de l article' }); 
    });

 if (nouvArticle) {
    SendMail('mariem.marsaoui@esprit.tn', 
    'Important de la part de RecycleConnect','', 
    'De nouveaux articles ont été ajoutés ! <br> Pour plus de détails, visiter notre plateforme !');
    res.status(200).json(nouvArticle);
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


export async function UpdateArticle (req, res){
  try {
    const existingarticle = await Article.findById(req.params.id);
    existingarticle.PhotoArticle = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename;
    existingarticle.NomArticle = req.body.NomArticle; 
    existingarticle.DescriptionArticle = req.body.DescriptionArticle;
    existingarticle.EtatArticle = req.body.EtatArticle;
    existingarticle.Categorie = req.body.CategorieId;
    const article = await existingarticle.save();
    res.status(200).json(article);

  }catch (error) {
    res.status(400).json({ error: 'Erreur de modification de l article' })
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
    const article = await Article.findOne({ NomArticle: { $regex: new RegExp(specialNomArticle, 'i') },
  });
    //console.log('Found Article:', article);
     return res.status(200).json({ article });
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