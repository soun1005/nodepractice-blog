// initialize express
const express = require('express');
// npm에서 다운받은 3rd party middleware
const morgan = require('morgan');
const mongoose = require('mongoose');
const password = encodeURIComponent('ASJmAVJ4sNiXQcIr');
const Blog = require('./models/blog');

// mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'Node is interesting',
    snippet: 'Node seems more interesting thatn i thought',
    body: 'But we will see very soon.',
  });
  // instance생성하면, 많은 methods를 사용할 수 있는데 그중 하나가 save()메서드임.
  // instance명.save() -> 데이터베이스에 저장
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// 데이터 get하기
app.get('/all-blog', (req, res) => {
  //get하는건 생성된 모델에 바로! .find붙이면 됨
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// 블로그 데이터 1개만 가져오기
app.get('/single-blog', (req, res) => {
  Blog.findById('64b4157aeb32f061f8a2b690')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
