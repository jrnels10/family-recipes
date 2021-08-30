

export interface IRecipe {
    title: string,
    chef: string,
    decription: string,
    image: string
};


export interface IUser {
    email: string;
    firstName?: string;
    lastName?: string;
    isLoggedin: boolean;
};
export interface ISignUser {
    email: string;
    firstName?: string;
    lastName?: string;
    password:string
}

export type RecipeContextState = {
    recipes: IRecipe[];
    addRecipe: (recipe: IRecipe) => void;
};


export type UserContextState = {
    user: IUser,
    setUserAcc: (user: IUser) => void
};
// type Foobar = 'FOO' | 'BAR';?/
// export type AppContextState = RecipeContextState | UserContextState

export type AppContextState = {
    recipes: IRecipe[];
    addRecipe: (recipe: IRecipe) => void;
    user: IUser;
    setUserAcc: (user: IUser) => void;
    // api:any
}

export function combineStates<S extends any>(states: S) {
    const combinedStates = (states: any) => {
        return { ...states };
    };
    return combinedStates(states);
}