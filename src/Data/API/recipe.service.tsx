
import axios from "axios";
import { IRecipe, IRecipeImage } from "../CTX/types";
import AuthService from "./auth.service";
import BaseHttpService from "./base-http.service";

export default class RecipeService extends BaseHttpService {
    //     async getWeather() {
    //         // const res = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=-112.2&lon=33.3&exclude=minutely,daily&appid=380b494a0c7f5b2c737c6f0e8bb71c07`);
    //         // console.log(JSON.stringify(res.data))
    //         const res= await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=33.3&lon=-112&exclude=minutely,daily&appid=380b494a0c7f5b2c737c6f0e8bb71c07`);
    //         debugger
    // return res;
    //     };getalluser
    async uploadImage(id: number, blobData: string, name: string, ext: string) {
        const formData = new FormData();
        formData.append('file', blobData, `myimage.${ext}`);
        formData.append('name', name);
        return await this.post(`google-upload/${id}`, formData)
    }
    async addRecipeImage(id: number, image: IRecipeImage) {
        if (image.fileName) {
            const bodyFormData = new FormData();
            bodyFormData.append("file", image.fileName);
            return await this.post(`google-upload/${id}`, bodyFormData)
        }
    }
    async getAllRecipes(user: boolean) {
        console.log(user)
        const res = await this.get(`recipe/getall${user ? 'user' : ''}`);
        return res;
    };

    async createNewRecipe(recipe: IRecipe) {
        debugger
        return await this.post('recipe', recipe)
    }
}