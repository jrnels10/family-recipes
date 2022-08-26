import { CreateRecipe } from "../interfaces/CreateRecipe";
import { RecipeService } from "../services/recipe-api";

export interface IRecipe {
    popular: boolean;
    title: string;
    created: moment.Moment;
    img: string;
}


export interface IContext {
    state: {
        recipes: IRecipe[],
        viewRecipe:IRecipe|null
    };
    recipeService: RecipeService;
    dispatch: React.Dispatch<any>;
    createRecipe: (recipe: CreateRecipe) => any;
    getPopularRecipes: () => void;
    setFavoriteRecipe:(recipe: IRecipe) => any;
}