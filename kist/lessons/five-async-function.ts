function multiply(num1: number, num2: number): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(num1 * num2);
    }, 1000);
  });
}


// The await Keyword
let result: number = await multiply(2, 2);
console.log("First   : ",result);

result = await multiply(result, 3);
console.log("Second  : ",result);

result = await multiply(result, 4);
console.log("Third   : ",result);

// async Functions
async function runMe(): Promise<void> {
  let result2: number = await multiply(result, 2);
  console.log("Four    : ",result2);
}


runMe();