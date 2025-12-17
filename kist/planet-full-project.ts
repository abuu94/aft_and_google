// planet full stack Project

// Backend Node API
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = 3000;

// Allow requests from the Vite dev server (http://localhost:5173)
app.use(cors());
app.use(express.json());

// ---- Interfaces ----

interface Moon {
  name: string;
}

interface Planet {
  name: string;
  radius: number; // in km
  moons: Moon[];
}

// ---- Sample data ----

const planets: Planet[] = [
  {
    name: "Mercury",
    radius: 2439,
    moons: []
  },
  {
    name: "Earth",
    radius: 6371,
    moons: [{ name: "Moon" }]
  },
  {
    name: "Mars",
    radius: 3389,
    moons: [{ name: "Phobos" }, { name: "Deimos" }]
  }
];

// ---- Routes ----

// Simple health check
app.get("/", (req: Request, res: Response) => {
  res.type("text/plain").send("Planets API is running");
});

// Main planets endpoint
app.get("/planets", (req: Request, res: Response) => {
  res
    .type("application/json")
    .status(200)
    .json(planets);
});

// ---- Start server ----

app.listen(PORT, () => {
  console.log(`Planets API running at http://127.0.0.1:${PORT}`);
});



// Frontend- Vite UI

console.log("Vite Project Started");

interface Moon {
  name: string;
}

interface Planet {
  name: string;
  radius: number; // km
  moons: Moon[];
}

async function fetchPlanets(): Promise<Planet[]> {
  const response = await fetch("http://127.0.0.1:3000/planets");

  if (!response.ok) {
    throw new Error("Failed to fetch planets: " + response.status);
  }

  const planets: Planet[] = await response.json();
  return planets;
}

function renderPlanets(planets: Planet[]): void {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) {
    throw new Error("#app element not found");
  }

  // Clear previous content
  app.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = "Planets";
  app.appendChild(title);

  planets.forEach((planet) => {
    const container = document.createElement("div");
    container.className = "planet";

    const name = document.createElement("h2");
    name.textContent = planet.name;
    container.appendChild(name);

    const info = document.createElement("p");
    info.textContent = `Radius: ${planet.radius} km`;
    container.appendChild(info);

    if (planet.moons.length > 0) {
      const subtitle = document.createElement("p");
      subtitle.textContent = "Moons:";
      container.appendChild(subtitle);

      const ul = document.createElement("ul");
      planet.moons.forEach((moon) => {
        const li = document.createElement("li");
        li.textContent = moon.name;
        ul.appendChild(li);
      });
      container.appendChild(ul);
    } else {
      const noMoons = document.createElement("p");
      noMoons.textContent = "No moons";
      container.appendChild(noMoons);
    }

    app.appendChild(container);
  });
}

async function main(): Promise<void> {
  try {
    const planets = await fetchPlanets();
    renderPlanets(planets);
  } catch (error) {
    console.error(error);

    const app = document.querySelector<HTMLDivElement>("#app");
    if (app) {
      app.textContent = "Failed to load planets.";
    }
  }
}

main();

