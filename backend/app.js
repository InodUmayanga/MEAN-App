const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');

  res.setHeader('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept');

  res.setHeader('Access-Control-Allow-Methods',
  'GET, POST, PATCH, PUT, DELETE, POTIONS');

  next();
});

app.post('/api/posts', (req, res, next)=>{
  const post = req.body;
  console.log(post);

  res.status(201).json({
    message: 'post added'
  });
});

app.get('/api/posts',(req, res, next)=>{

  const posts = [
    {
      id: '001',
      title: 'First server side post',
      content: 'coming from server'
    },
    {
      id: '002',
      title: 'Second server side post',
      content: 'coming secondlyfrom server'
    }
  ];

 res.status(200).json({
   message: 'posts fetched successfully',
   posts: posts
 });
});

module.exports = app;
