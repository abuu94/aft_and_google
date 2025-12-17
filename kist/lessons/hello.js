//   "type": "commonjs",  update this in package.json in order to run   node hello.js


const readline = require('readline-sync');

const name = readline.question('What is your name? ');
const age = readline.question('How old are you? ');

console.log(`Hello ${name}! You are ${age} years old.`);