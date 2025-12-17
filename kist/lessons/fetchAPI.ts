
// get
async function helloWorld(): Promise<void> {
  const response: Response = await fetch("http://localhost:3000/hello");
  const text: string = await response.text();
  console.log(text);
}

// post
async function sayHello(): Promise<void> {
  const response: Response = await fetch("http://localhost:3000/hello", {
    method: "POST",
    body: "hello server"
  });

  const text: string = await response.text();
  console.log(text);
}

// delete
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



// Fetching JSON with TypeScript

//  get
async function readPlanets(): Promise<void> {
  const response: Response = await fetch("http://localhost:3000/planets");
  const planets: Planet[] = await response.json();
  console.log(planets);
}
// post
async function sendJSON(planets: Planet[]): Promise<void> {
  const response: Response = await fetch("http://localhost:3000/planets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(planets)
  });

  const text: string = await response.text();
  console.log(text);
}