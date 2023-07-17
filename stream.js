const fs = require('fs');

// where do we want the data
const readStream = fs.createReadStream('./docs/blog3.txt', {
  // encoding -> to turn it readable! no need to do toString()
  encoding: 'utf8',
});

// how to pass data down a stream (파일 만드는거)

const writeStream = fs.createWriteStream('./docs/blog4.txt');

// every time we get chunk of data, callback function is fired, we get access to data
// readStream.on('data', (chunk) => {
//   console.log('-----new chunk------');
//   console.log(chunk);
//   // 새로 만든 파일에 chunk 넣기
//   writeStream.write('\nNEW CHUNK\n');
//   writeStream.write(chunk);
// });
// 위에거 졸라 복잡하니까 pipe라는 간단한걸로 쓰기

// piping
// blog3에 있는걸 읽어서 writeStream내용을 실행
readStream.pipe(writeStream);
