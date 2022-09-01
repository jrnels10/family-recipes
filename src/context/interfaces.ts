import { CreateRecipe } from "../interfaces/CreateRecipe";
import { RecipeService } from "../services/recipe-api";

export interface IRecipe {
    id: number;
    popular: boolean;
    title: string;
    created: moment.Moment;
    image: string;
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