const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const connectToDatabase = require('./database');
//routes
const articleRoutes = require('./routes/article');
const categorieRoutes = require('./routes/categorie');
//test user
const userRoutes = require('./routes/user');


const app = express();
const cors = require('cors');
const { createSampleUser } = require("./controller/User");

const port = process.env.PORT;

connectToDatabase();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/articles', articleRoutes); 
app.use('/api/categories', categorieRoutes);



const server = app.listen(port, () =>
  console.log(`Server listening  and working on port: ${port}`)
);
