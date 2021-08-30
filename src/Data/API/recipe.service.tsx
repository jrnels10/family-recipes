import AuthService from "./auth.service";
import BaseHttpService from "./base-http.service";

export default class RecipeService extends BaseHttpService{
 async GetRecipes(){
     const res = await this.get('./assets/RecipeList.json');
     debugger
 }
}