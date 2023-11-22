import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import connectToDatabase from './database.js';


//routes
import articleRoutes from'./routes/article.js';
import categorieRoutes from'./routes/categorie.js';
import reviewRoutes from'./routes/review.js';


const app = express();
import cors from 'cors';


const port = process.env.PORT;

connectToDatabase();
app.use(cors());
app.use('/uploads', express.static('uploads'));


app.use(bodyParser.json());

app.use('/api/articles', articleRoutes); 
app.use('/api/categories', categorieRoutes);
app.use('/api/reviews', reviewRoutes);



const server = app.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);
