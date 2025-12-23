// console.log(" === Local and Global Variable === ");

// let example: number = 10;

// function scopeExample(): void {
//   let example: number = 5;
//   console.log(example);
// }

// scopeExample();
// console.log(example);

console.log(" === Scope  and Changing Values === ");

let count: number;

function increment(): number {
  return count=count + 1;
}

count = 5;
console.log(increment());  // 6

count = 10;
console.log(increment());  // 11