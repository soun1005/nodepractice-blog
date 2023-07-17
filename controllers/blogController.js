// blog_index : to get blogs
// blog_details : to get single blog
// blog_create_get : to create a blog
// blog_delete : to delete blog

const Blog = require('../models/blog');

const blog_index = (req, res) => {
  Blog.find()
    // sort by descending order newest to oldest
    .sort({ createdAt: -1 })
    .then((result) => {
      // result is the one that is coming from db
      // result 는 데이터베이스에서 오는 결과임
      // 저장된 데이터를 ejs로 render하기 위해 result(data)를 blogs로 지정해줌
      res.render('index', { title: 'All Blogs', blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_details = (req, res) => {
  const id = req.params.id;
  // console.log(id);
  // 블로그중에 하나를 특정 id로 찾은 뒤
  Blog.findById(id)
    .then((result) => {
      // details.ejs에, id로 찾은 데이터를 디스플레이
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => res.status(404).render('404', { title: 'Blog not found' }));
};

const blog_create_get = (req, res) => {
  res.render('create', { title: 'Create a new blog' });
};

const blog_create_post = (req, res) => {
  // 새 블로그를 Blog 모델 instance로 저장한 뒤
  const blog = new Blog(req.body);
  // console.log(req.body);

  // 데이터베이스에 저장
  blog
    .save()
    .then((result) => {
      // 블로그 포스팅 버튼 누르면 홈페이지로 가도록 redirect해주기
      res.redirect('/blogs');
    })
    .catch((err) => console.log(err));
};

const blog_delete = (req, res) => {
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
};

module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
