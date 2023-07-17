// initialize express
const express = require('express');
// npm에서 다운받은 3rd party middleware
const morgan = require('morgan');
const mongoose = require('mongoose');
const password = encodeURIComponent('ASJmAVJ4sNiXQcIr');

const blogRoutes = require('./routes/blogRoutes');

// we need to set up express app
// invoke express function on the line2 and create instance called 'app'
// usually name it 'app'
const app = express();

// connect to mongodb
const dbURI = `mongodb+srv://thdms1005:${password}@netninjanodepractice.qmjskpn.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    (
      // only when db is connected, listen for request!
      result // listen for requests from porte 3000
    ) => app.listen(3000)
  )
  .catch((err) => console.log('error:', err));

// register view engine
// set함수 : 어플 config하게 도와줌
app.set('view engine', 'ejs');
// ejs가 템플릿 만드는데 사용되는걸 알도록 설정

// middleware & static files
app.use(express.static('public'));
// express에 이미 내장되어 있는 express.static을 사용하면 'public'안에 있는 것들은 다 public한 파일이 된다
// 이제 주소창에 /styles.css 하면 내용 볼 수 있음

// html에 있는 form의 내용을 가져오기 위한 미들웨어
// 이걸 사용하지 않으면 모든 값이 undefined됨
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));

// base route = 홈페이지
// 그냥 node.js를 사용한것과 비교해서 훨씬 간결해진 코드 app.get('첫번째 인자:path', 두번째 인자:(req, res))
app.get('/', (req, res) => {
  // blogs로 redirect하기 -> 따로 홈페이지를 만들어도 괜찮음.
  res.redirect('blogs');

  // const blogs = [
  //   {
  //     title: 'Yoshi finds eggs',
  //     snippet: 'Lorem ipsum dolor sit amet consectetur',
  //   },
  //   {
  //     title: 'Mario finds stars',
  //     snippet: 'Lorem ipsum dolor sit amet consectetur',
  //   },
  //   {
  //     title: 'How to defeat bowser',
  //     snippet: 'Lorem ipsum dolor sit amet consectetur',
  //   },
  // ];
  // // express가 자동으로 detect해서 데이터 타입과 응답코드를 정해줌! 대박

  // //   ejs로 render하기
  // // ****** ejs파일에 데이터 전송하려면 2번째 파람으로 전달하면 됨!!
  // res.render('index', { title: 'home', blogs });
  // // 이렇게 전달된 title은 index.ejs페이지에서 import하지 않고 바로! 사용 가능
});

// blog routes
// scoping with '/blogs' so that we can add other routes
app.use('/blogs', blogRoutes);

// 다른 route설정 -> 그냥 추가만 하면 됨
app.get('/about', (req, res) => {
  res.render('about', { title: 'about' });
});

// 404 page
// 모든 req요청에 이 함수가 실행된다
// 그래서 use함수가 맨 위에 써질경우, 모든 path에서 404페이지 나오게됨
app.use((req, res) => {
  // use함수: express코드 위에서부터 차례대로 시행한 다음에, 사용자가 요청한 페이지가 없을 때 이 함수를 실행함.
  // react router랑 비슷허네

  // 404코드를 추가
  res.status(404).render('404', { title: '404' });
});
