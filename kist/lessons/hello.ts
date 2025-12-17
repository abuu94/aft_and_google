//   "type": "module",  update this in package.json in order to run   ts-node hello.ts

import * as readline from "readline-sync";

let name: string = readline.question("What is your name?");
console.log("Hello, " + name);