// 코멘팅 되어있는게 바닐라 노드
// 컬러코드는 express!

// initialize express
const express = require('express');

// we need to set up express app
// invoke express function on the line2 and create instance called 'app'
// usually name it 'app'
const app = express();

// register view engine
// set함수 : 어플 config하게 도와줌
app.set('view engine', 'ejs');
// ejs가 템플릿 만드는데 사용되는걸 알도록 설정

// listen for requests from porte 3000
app.listen(3000);

// 그냥 node.js를 사용한것과 비교해서 훨씬 간결해진 코드 app.get('첫번째 인자:path', 두번째 인자:(req, res))
app.get('/', (req, res) => {
  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'Mario finds stars',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
    {
      title: 'How to defeat bowser',
      snippet: 'Lorem ipsum dolor sit amet consectetur',
    },
  ];
  // express가 자동으로 detect해서 데이터 타입과 응답코드를 정해줌! 대박
  // 메인 페이지에 Home page를 띄움
  // res.send('<p>Home page</p>');
  //root는 relative path를 설정하기 위해
  //   res.sendFile('./views/index.html', { root: __dirname });

  //   ejs로 render하기
  // ****** ejs파일에 데이터 전송하려면 2번째 파람으로 전달하면 됨!!
  // 아래의 코드 뜻 = index파일에 2번째 파람을 전송하라
  res.render('index', { title: 'home', blogs });
  // 이렇게 전달된 title은 index.ejs페이지에서 import하지 않고 바로! 사용 가능
});

// 다른 route설정 -> 그냥 추가만 하면 됨
app.get('/about', (req, res) => {
  //   res.send('<p>About page</p>');
  // res.sendFile('./views/about.html', { root: __dirname });
  res.render('about', { title: 'about' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// redirects
// app.get('/about-us', (req, res) => {
//   res.redirect('/about');
// });

// 404 page
// 모든 req요청에 이 함수가 실행된다
// 그래서 use함수가 맨 위에 써질경우, 모든 path에서 404페이지 나오게됨
app.use((req, res) => {
  // use함수: express코드 위에서부터 차례대로 시행한 다음에, 사용자가 요청한 페이지가 없을 때 이 함수를 실행함.
  // react router랑 비슷허네
  // res.status(404).sendFile('./views/404.html', { root: __dirname });
  // 404코드를 추가

  res.status(404).render('404', { title: '404' });
});
