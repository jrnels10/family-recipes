import { IRecipe } from "./interfaces";

export const setSearchedRecipes = (recipes: IRecipe[]) => ({
    type: "SET_SEARCHED_RECIPES",
    recipes,
  });