const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const connectToDatabase = require('./database');
//routes
const eventRouter = require('./routes/events');
//test user
const userRoutes = require('./routes/user');


const app = express();
const cors = require('cors');
const { createSampleUser } = require("./controller/User");

const port = process.env.PORT;

connectToDatabase();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/events',eventRouter)

//test user
// app.use('/user', userRoutes);
// createSampleUser();




const server = app.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);
