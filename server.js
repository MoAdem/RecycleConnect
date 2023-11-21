import express from 'express';
import path from 'path';
import connectToDatabase from './database.js';
const app = express();
import cors from 'cors';
import userRouter from './routes/user.js';
const port = process.env.PORT||5000;
import dotenv from 'dotenv';
dotenv.config();
//server
connectToDatabase();
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/user',userRouter)

const server = app.listen(port, () =>
 console.log(`Server listening on port: ${port}`)
);
