// Simple Example
{
  "name": "Earth",
  "radius": 6371,
  "isPlanet": true
}

// Complex example
[
  { "name": "Venus", "moons": [] },
  { "name": "Earth", "moons": [{ "name": "Moon" }] },
  {
    "name": "Mars",
    "moons": [
      { "name": "Phobos" },
      { "name": "Deimos" }
    ]
  }
]

// json with interface
interface Moon {
  name: string;
}

interface Planet {
  name: string;
  moons: Moon[];
}

// json with Typescript
async function readPlanets(): Promise<void> {
  const response: Response = await fetch("http://localhost:3000/planets");
  const planets: Planet[] = await response.json();
  console.log(planets);
}


// sending json with Post
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