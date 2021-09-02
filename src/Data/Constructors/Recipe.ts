
import RecipeService from '../API/recipe.service';
import { IUser } from '../CTX/types';
import { User } from './User';

export class Recipe extends User {
    private _recipeApi: any;
    private _private?: boolean;
    public title: string;
    public description?: string;
    public chef: string;
    constructor(props: any) {
        super(props)
        this._recipeApi = new RecipeService({ history: props.history, errorHandler: props.errorHandler })
        this.title = props.title;
        this.description = props.description;
        this.chef = props.chef;
        this._private = props._private ? props._private : true;
    }


    async getAllRecipes() {
        const res = await this._recipeApi.getAllRecipes();
    }

};