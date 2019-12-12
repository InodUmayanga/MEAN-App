const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, requred: true },
  content: { type: String, default: 'No Content' }
});

module.exports = mongoose.model('Post', postSchema);
