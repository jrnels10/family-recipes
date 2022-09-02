import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useEffect, useReducer } from "react";
import { useHistory } from "react-router";
import { CreateRecipe } from "../interfaces/CreateRecipe";
import { RecipeService } from "../services/recipe-api";
import { searchRecipes } from "./actions";
import { setSearchedRecipes } from "./dispatch";
import { IContext, IRecipe } from "./interfaces";
// import AtlasService from "../Services/atlas-service";

export const AppContext = createContext({} as IContext);

const initialState = {
  recipes: [] as IRecipe[],
  popularRecipes: [] as IRecipe[],
  viewRecipe: null,
};

const setRecipesList = (recipes: IRecipe[]) => ({
  type: "SET_RECIPES_LIST",
  recipes,
});

const setPopularRecipes = (recipes: IRecipe[]) => ({
  type: "SET_RECIPES_POPULAR",
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
    case "SET_RECIPES_POPULAR": {
      return {
        ...state,
        popularRecipes: [...action.recipes],
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

  const getPopularRecipes = async () => {
    const recipes = await recipeService.getPopularRecipes();
    dispatch(setPopularRecipes(recipes));
  };

  const getRecipes = async () => {
    const recipes = await recipeService.getRecipes();
    dispatch(setRecipesList(recipes));
  };
  const history = useHistory();

  const createRecipe = async (recipe: CreateRecipe) => {
    await recipeService.createRecipe(recipe, recipe.image);
    history.push("/");
  };

  const getSearchedRecipes = async (text: string) => {
    const recipes = await searchRecipes(recipeService, text);
    return [];
  };

  const setFavoriteRecipe = async (recipe: IRecipe) => {
    const favRecipe = await recipeService.favoriteRecipe(recipe.id);
    if (favRecipe) {
      dispatch(setFavorite(favRecipe));
    }
  };

  const setViewerRecipe = (recipe: IRecipe) => {
    dispatch(setViewer(recipe));
    history.push(`/view/${recipe.id}`);
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
    getRecipes,
    getPopularRecipes,
    getSearchedRecipes,
    setFavoriteRecipe,
    setViewerRecipe,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
