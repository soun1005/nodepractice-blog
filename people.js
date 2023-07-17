const people = ['soeun', 'flo', 'euna', 'celine'];
const ages = [20, 30, 50, 60];

// export single module
// module.exports = people;

// export multiple modules
// module.exports = {
//   // variable : value -> 내가 다시 이름을 지정해서 export 할 수 있음
//   people: people,
//   ages,
// };

// console.log(people);

module.exports = { people, ages };
