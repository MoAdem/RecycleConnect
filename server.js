const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const connectToDatabase = require('./database');
//routes
const eventRouter = require('./routes/events');
const donationRouter = require('./routes/donation');
const articleRoutes = require('./routes/article');
const categorieRoutes = require('./routes/categorie');
const userRouter = require('./routes/user');
const reservationrouter = require ('./routes/reservation');
const panierrouter = require ('./routes/panier');
//test user
const userRoutes = require('./routes/user');
//merge

const app = express();
const cors = require('cors');
const { createSampleUser } = require("./controller/User");

const port = process.env.PORT;

connectToDatabase();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/events',eventRouter)
app.use('/api/donation',donationRouter)

app.use('/api/articles', articleRoutes); 
app.use('/api/categories', categorieRoutes);

app.use('/api/user',userRouter)

app.use('/api/panier',panierrouter)
app.use('/api/reservation',reservationrouter)


//test user
// app.use('/user', userRoutes);
// createSampleUser();




const server = app.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);
