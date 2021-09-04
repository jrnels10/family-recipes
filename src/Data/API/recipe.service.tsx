import { IRecipe } from "../CTX/types";
import AuthService from "./auth.service";
import BaseHttpService from "./base-http.service";

export default class RecipeService extends BaseHttpService {
    async getRecipes() {
        const res = await this.get('./assets/RecipeList.json');
        debugger
    };

    async getAllRecipes() {
        const res = await this.get('recipe/getall');
        return res;
    };

    async createNewRecipe(recipe: IRecipe) {
        return await this.post('recipe', recipe)
    }
}