// create server

const http = require('http');
const fs = require('fs');
// initializsing loadash
const _ = require('lodash');

// request는 객체처럼 많은것을 가지고 있음
const server = http.createServer((req, res) => {
  // this code runs every time request comes in this server
  // 객체 전부 확인하려면 console.log(req)

  // url과 request method를 확인하는 방법
  //   console.log(req.url, req.method);

  // loadash
  const num = _.random(0, 20);
  console.log(num);

  const greet = _.once(() => {
    console.log('hello Florian');
  });

  greet();
  greet();

  //  response header? -> 브라우저에게 우리가 어떤 방식의 응답을 제공하는지 알려주는 부분
  //  예를들어, 데이터의 종류나 아니면 쿠키를 설정하는 것 등

  // set header content type
  res.setHeader('content-Type', 'text/html');

  let path = './views';

  //send an html page!
  fs.readFile('./views/index.html', (err, data) => {
    if (err) {
      console.log(err);
      //   always have to end the response
      res.end();
    } else {
      // 많은 종류의 res를 write하려면 res.write(data)이지만
      // res하나만 보내면 res.end() 여기에 직접 바로 넣어도 됨
      //   res.write(data);
      res.end(data);
    }
  });
});

server.listen(3001, 'localhost', () => {
  // this code runs when server starts listening
  console.log('listening for request on port 3001');
});
// server listening멈추려면 ctrl+c
// 파일에 변화가 있을땐 서버 ctrl+c해서 멈추고 다시 실행해야함
