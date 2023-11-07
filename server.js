const express = require("express");
const path = require('path');
const connectToDatabase = require('./database');
const app = express();
const cors = require('cors');
const panierrouter = require ('./routes/panier');
const port = process.env.PORT;
const reservationrouter = require ('./routes/reservation');
connectToDatabase();
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/api/panier',panierrouter)
app.use('/api/reservation',reservationrouter)

const server = app.listen(port, () =>
  console.log(`Server listening on port: ${port}`)
);
