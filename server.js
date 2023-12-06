import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import connectToDatabase from './database.js';
import cors from 'cors';
import forceHttps from 'express-force-https'; // Import express-force-https

// Routes
import articleRoutes from './routes/article.js';
import categorieRoutes from './routes/categorie.js';
import reviewRoutes from './routes/review.js';

const app = express();
const port = process.env.PORT;

connectToDatabase();
app.use(cors());
app.use(forceHttps); // Use express-force-https middleware
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());

app.use('/api/articles', articleRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/reviews', reviewRoutes);

const server = app.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);
