const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, requred: true },
  content: { type: String, default: 'No Content' },
  imagePath: { type: String, requred: true }
});

module.exports = mongoose.model('Post', postSchema);
