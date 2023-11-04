const express = require("express");
const path = require('path');
const connectToDatabase = require('./database');
const app = express();
const cors = require('cors');

const port = process.env.PORT;

connectToDatabase();
app.use(cors());

const server = app.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);
