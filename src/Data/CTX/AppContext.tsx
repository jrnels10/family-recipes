import { IonRouterContext } from "@ionic/react";
import { cleanup } from "@testing-library/react";
import React, { createContext, useState, FC, useEffect, useContext } from "react";
import { useHistory, useLocation, withRouter } from "react-router";
import RecipeService from "../API/recipe.service";
import { Recipe } from "../Constructors/Recipe";
import { User } from "../Constructors/User";
import placeHolderImage from './../../assets/Images/placeholder.jpg';
import { AppContextState, IRecipe, IRecipeImage, IUser, RecipeContextState, UserContextState } from "./types";

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
        recipeUpdates: undefined,
        setSaving: () => null,
        recipeApi: () => null,
        saveUpdate: () => null,
        updateRecipe: () => null,
        getRecipes: () => null,
        getRecipeById: () => null,
        resetRecipe: () => null
    }
);

const setStockPhoto = (photos: IRecipeImage[]) => {
    photos.push({
        fileName: 'placeholder',
        fileUrl: placeHolderImage
    })
}

interface Foo {
    [key: string]: any;
}
let foo: Foo = {};

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
    const [recipeUpdates, setRecipeUpdates] = useState(recipeDefaultValues.recipe)
    useEffect(() => {
        const user = new User({ history: ionRouterContext });
        user.checkToken(setUser);
    }, []);

    const setUserAcc = async (user: IUser) => {
        return setUser(user);
    };

    const getRecipes = async ({ search, filters }: { search?: string | undefined, filters?: any }) => {
        setRecipesLoading(true);
        const res = await recipeApi.getAllRecipes(user.isLoggedin, search, filters);
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
        if (id && id !== 'new' && recipes.length) {
            setRecipe(recipes.find(r => r.id === parseInt(id))); // grab the recipe from the recipeslist so that the data request doesnt mess up the recipecard animation.
        } else if (id) {
            const res = await recipeApi.getRecipeById(id);

            if (res.status === 200) {
                if (res.data.photos && !res.data.photos.length) {
                    res.data.photos.push({
                        fileName: 'placeholder',
                        fileUrl: placeHolderImage
                    })
                }
                setRecipe(res.data);
            }
        } else {
            setStockPhoto(recipes[recipes.length - 1].photos)
            setRecipe({ ...recipes[recipes.length - 1] }) // grabbing the last recipe because it was loaded from the form, not the database
        }
        return setRecipesLoading(false);
    };

    const updateRecipe = (keyValue?: Foo) => {
        if (!keyValue) {
            return setRecipeUpdates(undefined)
        }
        if (recipe && recipe.id) {
            if (recipeUpdates) {
                setRecipeUpdates({ ...recipeUpdates, ...keyValue });
            } else {
                const newUpdate: IRecipe = {
                    id: recipe.id,
                    title: "",
                    chef: "",
                    privacy: false,
                    description: "",
                    photos: [],
                    userId: 0
                }
                setRecipeUpdates({ ...newUpdate, ...keyValue });
            }


        }
    };

    const saveUpdate = async () => {
        setSaving(true);
        if (recipeUpdates && recipeUpdates.id) {
            const res = await recipeApi.updateRecipeInfo(recipeUpdates);
            if (res.status === 200) {
                setStockPhoto(res.data.photos);
                setRecipeUpdates(recipeDefaultValues.recipe);
                setRecipe(res.data);
                const foundIdx = recipes.findIndex(r => r.id === parseInt(res.data.id))
                setRecipes([...recipes.splice(foundIdx, 1, res.data)]);
            }
            history.push(`/recipe/${recipeUpdates.id}`)
        }
        setSaving(false);
    }

    const setRecipesLoading = (loading: boolean) => setLoadingRecipes(loading)
    const addRecipe = (recipes: IRecipe) => setRecipes((r) => [...r, recipes]);
    const resetRecipe = () => setRecipe(recipeDefaultValues.recipe)
    return (
        <AppContext.Provider
            value={{
                saving,
                recipe,
                recipeApi,
                user,
                recipes,
                recipeUpdates,
                loadingRecipes,
                setSaving,
                setUserAcc,
                addRecipe,
                saveUpdate,
                updateRecipe,
                getRecipeById,
                getRecipes,
                resetRecipe
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;