// 얘도 글로벌 객체임 -> 이미 안에 내장되어 있는 객체
// importing file system
const fs = require('fs');

// reading files
// readFile is asyncronose -> promise를 반환함
fs.readFile('./docs/blog12.txt', (err, data) => {
  if (err) {
    // 에러가 나면, 에러를 콘솔하라
    console.log(err);
  }
  console.log(data.toString());
});

// 위의 readFile함수가 비동기적으로 써있어서 last line이 먼저 실행됨
// console.log('last line');

// writing files
// writeFile function accepts three arguments
// 1. path, 2. the thing i want to write 3.함수
// fs.writeFile('./docs/blog1.txt', 'hello, world', () => {
//   console.log('file was written');
// });

// // if the file doesn't exist(1st argument), it creates file!
// fs.writeFile('./docs/blog2.txt', 'hello, Flo petit lapin', () => {
//   console.log('file was written');
// });

// make directories
// first argument -> path, name(내가 폴더 만들고 싶은곳과 폴더명)
// fs.mkdir('./assets', (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('folder created');
// });
// -> 폴더 있는지 미리 체크하는 방법, 폴더 있으면 삭제, 없으면 생성하는 코드
// if (!fs.existsSync('./assets')) {
//   fs.mkdir('./assets', (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log('folder created');
//   });
// } else {
//   fs.rmdir('./assets', (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log('folder deleted');
//   });
// }

// // delete files
// if (fs.existsSync('./docs/deleteme.txt')) {
//   fs.unlink('./docs/deleteme.txt', () => {
//     if (err) {
//       console.log(err);
//     }
//     console.log('file deleted');
//   });
// }
