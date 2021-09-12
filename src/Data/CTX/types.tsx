export interface IRecipeImage {
    id?: number,
    fileName: string,
    fileUrl?: string,
    format?: string,
    blobData?: Blob
}

export interface ICookTime {
    time: [number, number];
    hours: number;
    minutes: number
}

export interface IRecipe {
    id?: number,
    title: string,
    chef: string,
    privacy: boolean,
    description: string,
    photos: IRecipeImage[],
    cookTime?: string;
    ingredients?: string;
    instructions?:string;
};


export interface IUser {
    id?: number,
    validated: boolean,
    email: string;
    firstName?: string;
    lastName?: string;
    isLoggedin: boolean;
};
export interface ISignUser {
    email: string;
    firstName?: string;
    lastName?: string;
    password: string
}

export type RecipeContextState = {
    recipe?: IRecipe;
    recipes: IRecipe[];
    addRecipe: (recipe: IRecipe) => void;
};


export type UserContextState = {
    user: IUser,
    setUserAcc: (user: IUser) => void
};

export type AppContextState = {
    saving: boolean;
    recipe?: IRecipe;
    recipes: IRecipe[];
    addRecipe: (recipe: IRecipe) => void;
    user: IUser;
    setSaving: any;
    setUserAcc: (user: IUser) => void;
    loadingRecipes: boolean;
    recipeApi: any;
    getRecipes: any;
    getRecipeById: any;
    resetRecipe:any
}

export function combineStates<S extends any>(states: S) {
    const combinedStates = (states: any) => {
        return { ...states };
    };
    return combinedStates(states);
}