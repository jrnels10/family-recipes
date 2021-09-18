
import axios from "axios";
import { IRecipe, IRecipeImage } from "../CTX/types";
import AuthService from "./auth.service";
import BaseHttpService from "./base-http.service";
import queryString from 'query-string';

export default class RecipeService extends BaseHttpService {
    async uploadImage(id: number, blobData: Blob, name: string, ext: string) {
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
    async getAllRecipes(user: boolean, search?: string, filters?: any) {
        const queryObj = {};
        if (search && search.length) {
            Object.assign(queryObj, { search })
        }
        if (filters) {
            Object.assign(queryObj, { ...filters })
        }
        const queryStr = queryString.stringify(queryObj);
        console.log(queryStr)
        
        const res = await this.get(`recipe/getall${user ? 'user' : ''}${queryStr ? `?${queryStr}` : ''}`);
        console.log(res.data)

        return res;
    };

    async getRecipeById(id: string) {
        return await this.get(`recipe/${id}`)
    }

    async getChefs(){
        return await this.get('recipe/getchefs')
    }

    async createNewRecipe(recipe: IRecipe) {
        return await this.post('recipe', recipe)
    }
}