import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import connectToDatabase from './database.js';


//routes
import articleRoutes from'./routes/article.js';
import categorieRoutes from'./routes/categorie.js';



const app = express();
import cors from 'cors';


const port = process.env.PORT;

connectToDatabase();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/articles', articleRoutes); 
app.use('/api/categories', categorieRoutes);



const server = app.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);
