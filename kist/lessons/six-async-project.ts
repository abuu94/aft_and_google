async function add(a: number, b: number): Promise<number> {
  // simulated delay + result
  return new Promise<number>((resolve)=>{
    setTimeout(()=>{
        resolve(a+b);
    },500);
  });
}

async function sub(a: number, b: number): Promise<number> {
  // ...
   return new Promise<number>((resolve)=>{
    setTimeout(()=>{
        resolve(a-b);
    },500);
  });
}

async function mul(a: number, b: number): Promise<number> {
  // ...
   return new Promise<number>((resolve)=>{
    setTimeout(()=>{
        resolve(a*b);
    },500);
  });
}

async function div(a: number, b: number): Promise<number> {
  // ...
   return new Promise<number>((resolve)=>{
    setTimeout(()=>{
        resolve(a/b);
    },500);
  });
}


// async function main(): Promise<void> {
async function main(): Promise<void> {
  const x = 10;
  const y = 5;

  console.log("Addition      : ",await add(x, y));
  console.log("Substraction  : ",await sub(x, y));
  console.log("Multiplicatio : ",await mul(x, y));
  console.log("Division      : ",await div(x, y));
}

main();