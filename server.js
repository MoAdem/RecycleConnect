import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import connectToDatabase from './database.js';
//routes
import eventRouter from './routes/events.js';
import donationRouter from './routes/donation.js';
//test user
import userRoutes from './routes/user.js';
//merge

const app = express();
import cors from 'cors';
import { createSampleUser } from "./controller/User.js";

const port = process.env.PORT;

connectToDatabase();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/events', eventRouter);
app.use('/api/donation', donationRouter);

//test user
// app.use('/user', userRoutes);
// createSampleUser();

const server = app.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);
