// Public API

/*
https://theorie-webprogramming.surge.sh/planet-earth.json
https://theorie-webprogramming.surge.sh/planet-mars.json
*/

interface Moon {
  name: string;
}

interface Planet {
  name: string;
  moons: Moon[];
}

async function fetchPlanet(url: string): Promise<Planet> {
  const response: Response = await fetch(url);
  const planet: Planet = await response.json();
  return planet;
}

async function main(): Promise<void> {
  const earth = await fetchPlanet("https://theorie-webprogramming.surge.sh/planet-earth.json");
  const mars = await fetchPlanet("https://theorie-webprogramming.surge.sh/planet-mars.json");

  console.log("Earth:");
  console.log(earth);

  console.log("Mars:");
  console.log(mars);
}


main();