const express = require('express');
const blogController = require('../controllers/blogController');
const Blog = require('../models/blog');

// to create new instance of a router object
const router = express.Router();

// 1. app.get => router.get으로 변경
// 2. module.exports
// 3. app.js에 가서 import한 다음 app.use('blogs',blogRoutes) 불러오면 끝
// app.use(blogRoutes) -> 이렇게 해도 되지만 'blogs'를 추가하면 scoping할 수 있다.
router.get('/', blogController.blog_index);

// 블로그 포스팅 하기
router.post('/', blogController.blog_create_post);

// 블로그 데이터에 저장
router.get('/create', blogController.blog_create_get);

// 블로그를 id 파라미터로 찾기
router.get('/:id', blogController.blog_details);

// delete specific blog
router.delete('/:id', (req, res) => {
  // req.params.id = 주소창 파라미터에 접근하는 방법
  // 여기서 const id = 주소창에 찍히는 아이디
  const id = req.params.id;

  // 아이디로 데이터베이스에서 찾아서 삭제
  Blog.findByIdAndDelete(id)
    .then((result) => {
      // send back JSON as response to ejs file (???)
      // 왜냐면 ajax로 보내야하기 때문에 (details.ejs파일의 fetch로)
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
