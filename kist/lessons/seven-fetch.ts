async function helloWorld(): Promise<void> {
  const response: Response = await fetch("http://localhost:3000/hello");
  const text: string = await response.text();
  console.log(text);
}


async function sayHello(): Promise<void> {
  const response: Response = await fetch("http://localhost:3000/hello", {
    method: "POST",
    body: "hello server"
  });

  const text: string = await response.text();
  console.log(text);
}

async function deleteSomething(id: number): Promise<void> {
  const response: Response = await fetch(
    `http://localhost:3000/delete/${id}`,
    {
      method: "DELETE"
    }
  );

  const text: string = await response.text();
  console.log(text);
}