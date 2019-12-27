const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');

const app = express();

mongoose.connect('mongodb+srv://inod:'
  + process.env.MONGO_ATLAS_PW
  + '@cluster0-oeodj.mongodb.net/mean-app?retryWrites=true&w=majority')
  .then(() => {
    console.log('successfully connected to DB!');
  })
  .catch(() => {
    console.log('Connection faliure');
  });

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept');

  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, POTIONS');

  next();
});

app.use('/api/posts', postsRoutes);

module.exports = app;
