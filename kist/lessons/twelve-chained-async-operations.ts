// Chained Async Operations

import { resolve } from "node:dns";

async function add(a: number, b: number): Promise<number> {
  // simulated delay + result
  return new Promise<number>((resolve)=>{
    setTimeout(()=>{
        resolve(a+b);
    },500);
  });
}

async function mul(sum:number,i:number):Promise<number> {
   return new Promise<number>((resolve)=>{
    setTimeout(()=>{
        resolve(sum*i);
    },500);
   }); 
}

async function sub(doubled:number,i:number) :Promise<number>{
    return new Promise<number>((resolve)=>{
        setTimeout(()=>{
            resolve(doubled-i);
        },500);
    });
}

async function complexCalculation(a: number, b: number): Promise<number> {
  const sum = await add(a, b);
  const doubled = await mul(sum, 2);
  const result = await sub(doubled, 3);
  return result;
}

async function demo(): Promise<void> {
  const result = await complexCalculation(5, 7);
  console.log(result);
}

demo();

// function add(a: number, b: number) {
//     throw new Error("Function not implemented.");
// }
// function mul(sum: void, arg1: number) {
//     throw new Error("Function not implemented.");
// }

// function sub(doubled: void, arg1: number) {
//     throw new Error("Function not implemented.");
// }

