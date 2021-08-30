import { IonRouterContext } from "@ionic/react";
import { cleanup } from "@testing-library/react";
import React, { createContext, useState, FC, useEffect, useContext } from "react";
import { useHistory, withRouter } from "react-router";
import RecipeService from "../API/recipe.service";
import { User } from "../Constructors/User";
import { AppContextState, combineStates, IRecipe, IUser, RecipeContextState, UserContextState } from "./types";

const recipeDefaultValues: RecipeContextState = {
    recipes: [],
    addRecipe: () => { }
};

const userDefaultValues: UserContextState = {
    user: {
        isLoggedin: false,
        email: '',
        firstName: '',
        lastName: ''
    },
    setUserAcc: () => { }
}

export const AppContext = createContext<AppContextState>(
    {
        ...recipeDefaultValues,
        ...userDefaultValues
    }
);

const AppProvider: FC = ({ children }) => {
    const [user, setUser] = useState<IUser>(userDefaultValues.user);
    const [recipes, setRecipes] = useState<IRecipe[]>(recipeDefaultValues.recipes);
    const ionRouterContext = useContext(IonRouterContext);

    useEffect(() => {
        const user = new User({ history: ionRouterContext });
        user.checkToken(setUser);
    }, []);

    const setUserAcc = async (user: IUser) => {
        return setUser(user);
    };

    const addRecipe = (recipes: IRecipe) => setRecipes((r) => [...r, recipes]);

    return (
        <AppContext.Provider
            value={{
                // api,
                user,
                recipes,
                setUserAcc,
                addRecipe
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;