// Represents a single cocktail/drink

import * as readline from "readline-sync";

export interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkAlternate: string | null;
  strTags: string | null;
  strVideo: string | null;
  strCategory: string | null;
  strIBA: string | null;
  strAlcoholic: string | null;
  strGlass: string | null;

  // Instructions in multiple languages
  strInstructions: string | null;
  strInstructionsES: string | null;
  strInstructionsDE: string | null;
  strInstructionsFR: string | null;
  strInstructionsIT: string | null;
  strInstructionsZH_HANS: string | null;
  strInstructionsZH_HANT: string | null;

  // Thumbnail image
  strDrinkThumb: string | null;

  // Ingredients (up to 15)
  strIngredient1: string | null;
  strIngredient2: string | null;
  strIngredient3: string | null;
  strIngredient4: string | null;
  strIngredient5: string | null;
  strIngredient6: string | null;
  strIngredient7: string | null;
  strIngredient8: string | null;
  strIngredient9: string | null;
  strIngredient10: string | null;
  strIngredient11: string | null;
  strIngredient12: string | null;
  strIngredient13: string | null;
  strIngredient14: string | null;
  strIngredient15: string | null;

  // Measures (up to 15)
  strMeasure1: string | null;
  strMeasure2: string | null;
  strMeasure3: string | null;
  strMeasure4: string | null;
  strMeasure5: string | null;
  strMeasure6: string | null;
  strMeasure7: string | null;
  strMeasure8: string | null;
  strMeasure9: string | null;
  strMeasure10: string | null;
  strMeasure11: string | null;
  strMeasure12: string | null;
  strMeasure13: string | null;
  strMeasure14: string | null;
  strMeasure15: string | null;

  // Metadata
  strImageSource: string | null;
  strImageAttribution: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}

// Represents the full API response
export interface CocktailResponse {
  drinks: Drink[];
}


async function getCocktails(ingredient: string): Promise<void> {
  const response: Response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${ingredient}`
  );
  const data: CocktailResponse = await response.json();

  if (!data.drinks) {
    console.log(`No cocktails found with ${ingredient}.`);
    return;
  }

  console.log(`Cocktails with ${ingredient}:`);
  for (const drink of data.drinks) {
    console.log(`- ${drink.strDrink}`);
  }
}


async function demo(): Promise<void> {
    console.log("-------------------------------------------");
    console.log("| Welcome to the cocktail lookup service. |");
    console.log("-------------------------------------------");
    let input = String(readline.question("Enter a drink name: "));
    const result = await getCocktails(input);
    return result;
}

demo();
