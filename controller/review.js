import Review from '../model/review.js';


export async function createReview(req, res) {
  const {Note, Avis, ArticleId} = req.body;
    console.log('Received data:', req.body);
   if (!Note || !Avis || !ArticleId) 
  {
     return res.status(400).json({ error: "Champs vides !" });
  }
   if (Note < 0 || Note > 5) 
  {
     return res.status(400).json({ error: "Note erronée !" });
  }
   try {
     const nouvreview = await Review.create({
       Note: req.body.Note,
       Avis: req.body.Avis,
       Article: req.body.ArticleId
     });
     return res.status(200).json(nouvreview);
  } catch (error) {
     return res.status(400).json({ error: "Erreur dans la creation du review" });
  }
 }

 
export async function getAllReviews(req, res) {
  try {
     const reviews = await Review.find();
     res.status(200).json(reviews);
  } catch (error) {
     res.status(400).json({ error: 'Erreur de l affichage de toutes reviews' });
  }
 }

/* export function updatereview (req, res) {
  Review.findByIdAndUpdate(req.params.id)
  .then((review) => { res.status(200).json(review); })
  .catch(res.status(400).json({ error: 'Erreur de modification de la review' }))
}
 */

export async function updateReview(req, res) {
  const { Note, Avis, ArticleId } = req.body;
 
  if (!Note || !Avis) {
     return res.status(400).json({ error: "Champs vides !" });
  }
 
  if (Note < 0 || Note > 5) 
  {
     return res.status(400).json({ error: "Note erronée !" });
  }
 
  try {
     const existingReview = await Review.findById(req.params.id);
     if (!existingReview) {
       return res.status(400).json({ error: "Ce review n'existe pas." });
     }
     existingReview.Note = Note;
     existingReview.Avis = Avis;
     existingReview.Article = ArticleId;
 
     const updatedReview = await existingReview.save();
     return res.status(200).json(updatedReview);
  } catch (error) {
     return res.status(400).json({ error: error.message || "Erreur de modification de la review" });
  }
 }



export async function deleteReview (req, res) {
  try {
  const review = await Review.findByIdAndRemove(req.params.id);
  res.json({ message: 'review supprimé' });
  }
  catch(error){ res.status(400).json({ error: 'Erreur de la suppression du review' });}
}

