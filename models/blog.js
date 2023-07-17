// require mongoose package
const mongoose = require('mongoose');

// 스키마는 대문자로 시작해야 함
// schema is the thing that is going to define the structure of the documents
// that we are gonna later store inside a collection and it's the thing that a model wraps around
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

// model
// usually 대문자
// 1. we make schema
// 2. make model and give 2 arguments. 1. name of model and 2. name of schema
const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
