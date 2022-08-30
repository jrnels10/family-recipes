import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { CreateRecipe } from "../interfaces/CreateRecipe";
import { RecipeService } from "../services/recipe-api";
import { searchRecipes } from "./actions";
import { setSearchedRecipes } from "./dispatch";
import { IContext, IRecipe } from "./interfaces";
// import AtlasService from "../Services/atlas-service";

export const AppContext = createContext({} as IContext);

const initialState = {
  recipes: [] as IRecipe[],
  viewRecipe: null,
};

const setRecipesList = (recipes: IRecipe[]) => ({
  type: "SET_RECIPES_LIST",
  recipes,
});

export const setViewer = (recipe: IRecipe | null) => ({
  type: "SET_VIEWER",
  recipe,
});

export const setFavorite = (recipe: IRecipe) => ({
  type: "SET_FAVORITE",
  recipe,
});

const reducer = (state: typeof initialState, action: any) => {
  switch (action.type) {
    case "SET_RECIPES_LIST": {
      return {
        ...state,
        recipes: [...action.recipes],
      };
    }
    case "SET_SEARCHED_RECIPES": {
      return {
        ...state,
        searchedRecipes: [...action.recipes],
      };
    }
    case "SET_VIEWER": {
      const { recipe } = action;
      return {
        ...state,
        viewRecipe: recipe,
      };
    }
    default:
      return state;
  }
};

const AppContextProvider = ({ children }: any) => {
  const fullInitialState = {
    ...initialState,
  };
  const auth0 = useAuth0();
  const [state, dispatch] = useReducer(reducer, fullInitialState);
  const recipeService = new RecipeService({ auth0 });
  const { user } = auth0;
  const getPopularRecipes = () => {
    const recipes = recipeService.getRecipes();
    dispatch(setRecipesList(recipes));
  };

  const createRecipe = async (recipe: CreateRecipe) => {
    const newRecipe = await recipeService.createRecipe(recipe);
    debugger;
  };

  const getSearchedRecipes = async (text: string) => {
    const recipes = await searchRecipes(recipeService, text);
    dispatch(setSearchedRecipes(recipes));
  };

  const setFavoriteRecipe = async (recipe: IRecipe) => {
    const favRecipe = await recipeService.favoriteRecipe(2);
    if (favRecipe) {
      dispatch(setFavorite(favRecipe));
    }
  };

  const fetchUserData = async () => {
    let userData = await recipeService.createUser(user);
    console.log(userData);

    return userData;
  };

  useEffect(() => {
    if (auth0.user) {
      fetchUserData();
    }
  }, [auth0]);

  let value = {
    state,
    recipeService,
    dispatch,
    createRecipe,
    getPopularRecipes,
    getSearchedRecipes,
    setFavoriteRecipe,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
