// thirteen-fetch-filter-planets
interface Moon {
  name: string;
}

interface Planet {
  name: string;
  moons: Moon[];
}

async function getPlanets(): Promise<Planet[]> {
  const response: Response = await fetch(
    "https://theorie-webprogramming.surge.sh/planets.json"
  );
  const planets: Planet[] = await response.json();
  return planets;
}

async function showPlanetsWithMoons(): Promise<void> {
  const planets = await getPlanets();

  const withMoons = planets.filter((p) => p.moons.length > 0);

  for (const planet of withMoons) {
    console.log(
      `${planet.name} has ${planet.moons.length} moon(s).`
    );
  }
}

showPlanetsWithMoons();