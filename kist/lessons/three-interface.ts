interface StellarObject {
  name: string;
  isPlanet: boolean;
  radius: number;
}

let earth: StellarObject = {
  name: "Earth",
  isPlanet: true,
  radius: 6371
};


console.log("The name of the celestial body is " + earth.name);
console.log("Its radius is " + earth.radius);



console.log(earth.name); // Earth
earth.name = "Terra";
console.log(earth.name); // Terra
// interface Moon {
//   name: string;
//   radius: number;
// }

// interface Planet {
//   name: string;
//   radius: number;
//   moons: Moon[];
// }