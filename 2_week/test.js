const readlineSync = require('readline-sync');

const pressKey = readlineSync.question('계속하려면 엔터키를 누르세요.');

console.log(pressKey);