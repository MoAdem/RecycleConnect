import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import connectToDatabase from './database.js';
//routes
import reservationRouter from './routes/reservation.js';
import panierRouter from './routes/panier.js';
//test user

//merge

const app = express();
import cors from 'cors';


const port = process.env.PORT;

connectToDatabase();
app.use(cors());
app.use(bodyParser.json());


app.use('/api/reservation', reservationRouter);
app.use('/api/panier', panierRouter);
//test user
// app.use('/user', userRoutes);
// createSampleUser();

const server = app.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);