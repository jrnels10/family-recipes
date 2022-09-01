import moment from "moment";
import { IRecipe } from "../context/interfaces";
import { CreateRecipe } from "../interfaces/CreateRecipe";
import { savePicture } from "../Utils/Camera";
import BaseHttpService from "./base-http";

export class RecipeService extends BaseHttpService {
  userId = null as number | null;
  createUser(user:any) {
   return this.post(`${this.BASE_URL}/users`,{...user, auth0Id:user.sub})
  };

  getUser(user:any) {
    return this.post(`${this.BASE_URL}/`, user)
  }

  async getRecipes(text?:string) {
    if (text) {
      
      // return sampleRecipes.filter(recipe => recipe.title.includes(text))
    }
  const allRecipes:any= await this.get(`${this.BASE_URL}/recipes`)
    return allRecipes.data;
  }

  async createRecipe(recipe: CreateRecipe,image?:any) {

    const formData = await createImageForm(recipe, image);
    return await this.post(`${this.BASE_URL}/recipes`,formData,{
      headers: {
        'Content-Type': 'multipart/form-data'
      }})
  }

  async favoriteRecipe(id: number) {
    console.log(id)
   const res:any= await this.post(`${this.BASE_URL}/favorite`, {id})
    if (res) {
      return res as IRecipe;
   }
  }
}

async function createImageForm(recipe: CreateRecipe,image?:any) {
  const response = await fetch(image.webviewPath);
  const blob = await response.blob();
  const formData = new FormData();
  formData.append('image', blob, image.filepath);
  for (const property in recipe) {
    if (property) {
      formData.append(`${property}`,recipe[property] as string)
    }
  }
  return formData
}
  
const sampleRecipes = [
  {
    title: 'recipe one',
    popular: true,
    created: moment().subtract(100, "days"),
    img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
  },  {
    title: 'recipe two',
    created: moment().subtract(100, "days"),

    popular: false,
    img:'https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    title: 'recipe three',
    created: moment().subtract(200, "days"),
    popular: true,
    img:'https://images.unsplash.com/photo-1481070555726-e2fe8357725c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
  },
  {
    title: 'recipe four',
    created: moment().subtract(25, "days"),

    popular: false,
    img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80'
  },
  {
    title: 'recipe five',
    created: moment().subtract(15, "days"),
    popular: false,
    img:'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    title: 'recipe six',
    created: moment().subtract(20, "days"),
    popular: true,
    img:'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=749&q=80'
  },
  
]