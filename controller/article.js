import Article from "../model/article.js";
import nodemailer from 'nodemailer';


export async function createArticle(req, res) {
 const { NomArticle, DescriptionArticle, EtatArticle, CategorieId } = req.body;

 if (!NomArticle || !DescriptionArticle || !EtatArticle || !CategorieId) {
    res.status(400).json({ error: 'Champs vides !' });
 }

 const photos = req.files.map(
    (file) => req.protocol + "://" + req.get("host") + "/uploads/" + file.filename
 );

 const nouvArticle = await Article.create
    ({PhotosArticle: photos, 
      NomArticle,
      DescriptionArticle, 
      EtatArticle, 
      Categorie: CategorieId})
    .catch(err => { 
      res.status(400).json({ error: 'Erreur dans la creation de l article' }); 
    });

 if (nouvArticle) {
    //sendMail('bouguerra.hanine@esprit.tn', 'Test subject', 'Hello, this is a test email.', '<p>Hello, this is a test email.</p>');
    res.status(200).json(nouvArticle);
 }
}

async function sendMail(to, subject, text, html) 
{
  try {
      // Création d'un transport pour envoyer l'e-mail
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'mariem.marsaoui@esprit.tn',
              pass: '201JFT2390'
          }
      });

      // Création de l'objet de l'e-mail
      const mailOptions = {
          from: 'mariem.marsaoui@esprit.tn',
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


export async function getAllArticles(req, res) {
  try {
  const articles = await Article.find();
  res.status(200).json(articles);
} catch (error) {
  res.status(400).json({ error: 'Erreur de l affichage de tous les articles' });
}
}


export async function getArticleById(req, res){
  try {
    const article = await Article.findById(req.params.id);
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ error: 'Erreur de l affichage de l article'});
  }
}


export async function updateArticle (req, res){
  try {
    const existingarticle = await Article.findById(req.params.id);
    existingarticle.PhotosArticle = req.files.map(
      (file) => req.protocol + "://" + req.get("host") + "/uploads/" + file.filename);
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


export async function deleteArticle (req, res){
  try {
  const article = await Article.findByIdAndRemove(req.params.id);
  res.json({ message: 'Article supprimé' });
  }catch(error) {
    res.status(400).json({ error: 'Erreur de la suppression de l article' });
  }
}
