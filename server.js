import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import connectToDatabase from './database.js';
import { notFoundError,errorHandler } from './middleware/error-handler.js';
//routes
import eventRouter from './routes/events.js';
import donationRouter from './routes/donation.js';
import reservationRouter from './routes/reservation.js';
import panierRouter from './routes/panier.js';
import livraisonRoutes from './routes/livraison.js';
import pointCollecteRoutes from './routes/pointCollecte.js';
import verifierProduitRoutes from './routes/verifierProduit.js'
import userRouter from './routes/user.js';
import articleRoutes from'./routes/article.js';
import categorieRoutes from'./routes/categorie.js';
import newsRouter from './routes/news.js';
import reviewRoutes from'./routes/review.js';
//test user
// import userRoutes from './routes/user.js';
//merge

const app = express();
import cors from 'cors';
// import { createSampleUser } from "./controller/User.js";

const port = process.env.PORT;

connectToDatabase();
app.use(cors());
app.use(bodyParser.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/events', eventRouter);
app.use('/api/donation', donationRouter);
app.use('/api/news', newsRouter);

app.use('/api/reservation', reservationRouter);
app.use('/api/panier', panierRouter);

app.use('/pointCollecte',pointCollecteRoutes);
app.use('/livraison',livraisonRoutes);
app.use('/verifierProduit',verifierProduitRoutes)


app.use('/api/articles', articleRoutes); 
app.use('/api/categories', categorieRoutes);
app.use('/api/reviews', reviewRoutes);

app.use('/api/user',userRouter)





app.use(notFoundError);

app.use(errorHandler);

//test user
// app.use('/user', userRoutes);
// createSampleUser();

const server = app.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);
