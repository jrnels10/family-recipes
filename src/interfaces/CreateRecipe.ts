import { IUserPhoto } from "./UserPhoto";

export interface CreateRecipe {
    title: string;
    ingredientList: string[];
    duration: string;
    image?: any;
    description?: string;
    [key: string]: number |string|undefined|string[]
}