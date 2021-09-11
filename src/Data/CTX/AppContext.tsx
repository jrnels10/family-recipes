import { IonRouterContext } from "@ionic/react";
import { cleanup } from "@testing-library/react";
import React, { createContext, useState, FC, useEffect, useContext } from "react";
import { useHistory, withRouter } from "react-router";
import RecipeService from "../API/recipe.service";
import { Recipe } from "../Constructors/Recipe";
import { User } from "../Constructors/User";
import placeHolderImage from './../../assets/Images/placeholder.jpg';
import { AppContextState, IRecipe, IUser, RecipeContextState, UserContextState } from "./types";

const recipeDefaultValues: RecipeContextState = {
    recipe: undefined,
    recipes: [],
    addRecipe: () => { }
};

const userDefaultValues: UserContextState = {
    user: {
        validated: false,
        isLoggedin: false,
        email: '',
        firstName: '',
        lastName: ''
    },
    setUserAcc: () => { }
}

export const AppContext = createContext<AppContextState>(
    {
        saving: false,
        ...recipeDefaultValues,
        ...userDefaultValues,
        loadingRecipes: true,
        setSaving:()=>null,
        recipeApi: () => null,
        getRecipes: () => null,
        getRecipeById: () => null
    }
);

const AppProvider: FC = ({ children }) => {
    const history = useHistory();
    const [errorHandler, setErrorHandler] = useState();
    const recipeApi = new RecipeService({ history: history, errorHandler: setErrorHandler });
    const [user, setUser] = useState<IUser>(userDefaultValues.user);
    const [loadingRecipes, setLoadingRecipes] = useState<boolean>(true);
    const [saving, setSaving] = useState<boolean>(false);
    const [recipes, setRecipes] = useState<IRecipe[]>(recipeDefaultValues.recipes);
    const [recipe, setRecipe] = useState(recipeDefaultValues.recipe);
    const ionRouterContext = useContext(IonRouterContext);
    // const recipe = new Recipe({ history: ionRouterContext });

    useEffect(() => {
        const user = new User({ history: ionRouterContext });
        user.checkToken(setUser);
    }, []);

    const setUserAcc = async (user: IUser) => {
        return setUser(user);
    };

    const getRecipes = async ({ search, filter }: { search?: string | undefined, filter?: any }) => {
        setRecipesLoading(true);
        const res = await recipeApi.getAllRecipes(user.isLoggedin, search, filter);
        if (res && res.status === 200) {
            res.data.map((d: any) => {
                if (d.photos && !d.photos.length) {
                    d.photos.push({
                        fileName: 'placeholder',
                        fileUrl: placeHolderImage
                    })
                }
            })
            setRecipes([...res.data])
        }
        return setRecipesLoading(false);
    };
    const getRecipeById = async ({ id }: { id: string }) => {
        setRecipesLoading(true);
        const res = await recipeApi.getRecipeById(id);
        if (res && res.status === 200) {
            if (res.data.photos && !res.data.photos.length) {
                res.data.photos.push({
                    fileName: 'placeholder',
                    fileUrl: placeHolderImage
                })
            }
            setRecipe({ ...res.data })
        }
        return setRecipesLoading(false);
    }
    const setRecipesLoading = (loading: boolean) => setLoadingRecipes(loading)
    const addRecipe = (recipes: IRecipe) => setRecipes((r) => [...r, recipes]);
    return (
        <AppContext.Provider
            value={{
                saving,
                recipe,
                recipeApi,
                user,
                recipes,
                loadingRecipes,
                setSaving,
                setUserAcc,
                addRecipe,
                getRecipeById,
                getRecipes
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;