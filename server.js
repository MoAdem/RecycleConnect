const express = require("express");
const path = require('path');
const connectToDatabase = require('./database');
const app = express();
const cors = require('cors');
const userRouter = require('./routes/user');
// const bodyParser = require("body-parser");

const port = process.env.PORT;

connectToDatabase();
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
// app.use(bodyParser.json)
//routes
app.use('/api/user',userRouter)

const server = app.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);
