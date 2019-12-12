const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

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

app.post('/api/posts', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  // console.log(post);
  post.save();
  res.status(201).json({
    message: 'post added'
  });
});

app.get('/api/posts', (req, res, next) => {
  Post.find()
    .then(documents => {
      res.status(200).json({
        message: 'posts fetched successfully',
        posts: documents
      });
    });
});

module.exports = app;
