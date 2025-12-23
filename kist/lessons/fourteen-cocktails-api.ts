// fourteen-cocktails-api.ts

// Create a new project cocktails-api.

// Ask the user for an ingredient and then use the cocktail api to search all cocktails containing this ingredient. Display those cocktails.

// You can access the API using following URL:


// Copy
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=kiwi
// Example 

// Copy
// -------------------------------------------
// | Welcome to the cocktail lookup service. |
// -------------------------------------------
// Please provide an ingredient: Kiwi
// Cocktails with Kiwi:
// - Kiwi Lemon
// - Kiwi Martini
// - Kiwi Papaya Smoothie

// async function getCocktails():Promise<void> {
//     const response:Response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=kiwi");
//     const text:string = await response.json();
//     console.log(text);
    
    
// }

// getCocktails();

// async function getCocktails(): Promise<void> {
//   const response: Response = await fetch(
//     "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=kiwi"
//   );

//   // response.json() returns an object, not a string
//   const data = await response.json();

//   console.log(data); // logs the full JSON object
// }

// getCocktails();

async function getCocktails(): Promise<void> {
  const response: Response = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=kiwi"
  );
  const data = await response.json();

  if (!data.drinks) {
    console.log("No cocktails found.");
    return;
  }

  console.log("Cocktails with Kiwi:");
  for (const drink of data.drinks) {
    console.log(`- ${drink.strDrink}`);
  }
}

getCocktails();

