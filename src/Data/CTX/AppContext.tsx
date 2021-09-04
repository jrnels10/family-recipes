import { IonRouterContext } from "@ionic/react";
import { cleanup } from "@testing-library/react";
import React, { createContext, useState, FC, useEffect, useContext } from "react";
import { useHistory, withRouter } from "react-router";
import RecipeService from "../API/recipe.service";
import { Recipe } from "../Constructors/Recipe";
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
        ...userDefaultValues,
        loadingRecipes:true,
        recipeApi: () => null
    }
);

const AppProvider: FC = ({ children }) => {
    const history = useHistory();
    const [errorHandler, setErrorHandler]=useState();
    const recipeApi = new RecipeService({ history: history, errorHandler: setErrorHandler });
    const [user, setUser] = useState<IUser>(userDefaultValues.user);
    const [loadingRecipes, setLoadingRecipes] = useState<boolean>(true);
    const [recipes, setRecipes] = useState<IRecipe[]>(recipeDefaultValues.recipes);
    const ionRouterContext = useContext(IonRouterContext);
    // const recipe = new Recipe({ history: ionRouterContext });

    useEffect(() => {
        const user = new User({ history: ionRouterContext });
        user.checkToken(setUser);
        getRecipes();
    }, []);

    const setUserAcc = async (user: IUser) => {
        // recipes
        return setUser(user);
    };

    const getRecipes = async () => {
        const res = await recipeApi.getAllRecipes();
        if(res && res.status === 200){
            return setRecipes([...res.data])
        }
    };
    const setRecipesLoading = (loading:boolean)=> setLoadingRecipes((l)=> l)
    const addRecipe = (recipes: IRecipe) => setRecipes((r) => [...r, recipes]);
console.log(recipes)
    return (
        <AppContext.Provider
            value={{
                recipeApi,
                user,
                recipes,
                loadingRecipes,
                setUserAcc,
                addRecipe
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;