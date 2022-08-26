import { IUserPhoto } from "./UserPhoto";

export interface CreateRecipe {
    title: string;
    ingredientList: string[];
    duration: string;
    image?: IUserPhoto;
    description?:string
}