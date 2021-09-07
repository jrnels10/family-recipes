export interface IRecipeImage {
    id?: number,
    fileName: string,
    fileUrl?: string,
    format?: string,
    blobData?: Blob
}


export interface IRecipe {
    id?: number,
    title: string,
    chef: string,
    privacy: boolean,
    description: string,
    photos?: IRecipeImage[]
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
    recipes: IRecipe[];
    addRecipe: (recipe: IRecipe) => void;
};


export type UserContextState = {
    user: IUser,
    setUserAcc: (user: IUser) => void
};

export type AppContextState = {
    recipes: IRecipe[];
    addRecipe: (recipe: IRecipe) => void;
    user: IUser;
    setUserAcc: (user: IUser) => void;
    loadingRecipes: boolean;
    recipeApi: any,
    getRecipes: any
}

export function combineStates<S extends any>(states: S) {
    const combinedStates = (states: any) => {
        return { ...states };
    };
    return combinedStates(states);
}