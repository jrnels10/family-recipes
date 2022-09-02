import { CreateRecipe } from "../interfaces/CreateRecipe";
import { RecipeService } from "../services/recipe-api";

export interface IRecipe {
    id: number;
    likedcount: number;
    userliked: boolean;
    title: string;
    created: moment.Moment;
    image: string;
}


export interface IContext {
    state: {
        recipes: IRecipe[],
  popularRecipes: IRecipe[],
        viewRecipe:IRecipe|null
    };
    recipeService: RecipeService;
    dispatch: React.Dispatch<any>;
    getRecipes: () => void;
    createRecipe: (recipe: CreateRecipe) => any;
    getPopularRecipes: () => void;
    setFavoriteRecipe: (recipe: IRecipe) => any;
    setViewerRecipe:(id: number) => void;
}