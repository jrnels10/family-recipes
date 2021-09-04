import React, { useContext, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonGrid, IonRow, IonTextarea, IonCol, IonFab, IonFabButton, IonIcon, IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import { IRecipe } from '../Data/CTX/types';
import { AppContext } from '../Data/CTX/AppContext';

const customActionSheetOptions = {
    header: 'Colors',
    subHeader: 'Select your favorite color'
};

export const RecipeInput: React.FC = () => {
    const { recipeApi } = useContext(AppContext);
    const [toppings, setToppings] = useState<string[]>([]);
    const [description, setDescription] = useState<string>('');
    const [chef, setChef] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [ingredient, setIngredient] = useState<string>('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    // title: string,
    // chef: string,
    // description: string,
    // photos: IRecipeImage[]

    const AddIngredient = () => {
        if (ingredient) {
            setIngredients([...ingredients, ingredient])
            setIngredient('')
        };
    };


    const submitRecipe = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormSubmitted(true);
        if (title && chef) {
            const recipe: IRecipe = { title, chef, description, photos: [] };
            console.log(recipe)
            const res = await recipeApi.createNewRecipe(recipe);
            debugger
        }
        // const pattern = new RegExp(
        //   "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
        // );
        // if (!email) {
        //   SetEmailError(true);
        // }
        // if (!password || !pattern.test(password)) {
        //   setPasswordError(true);
        // };
        // if (!email || !password || !pattern.test(password)) {
        //   return;
        // }
        // if (email && password) {
        //   const user = new User({ email, password, history, errorHandler: setUserError });
        //   await user.signIn();
        //   setUserAcc(user);
        //   history.push('/tab/recipes', { direction: 'none' });
        // }
    };
    return (
        // <IonPage>
        <IonContent>
            <form noValidate onSubmit={submitRecipe}>
                <IonGrid className="ion-padding">
                    <IonList>
                        <IonItem className='ion-no-padding'>
                            <IonLabel position="floating">Title</IonLabel>
                            <IonInput value={title} placeholder="Name of recipe" onIonChange={e => setTitle(e.detail.value!)} clearInput></IonInput>
                        </IonItem>
                        <IonItem className='ion-no-padding'>
                            <IonLabel position="floating">Chef</IonLabel>
                            <IonInput value={chef} placeholder="Who is the author of this recipe" onIonChange={e => setChef(e.detail.value!)} clearInput></IonInput>
                        </IonItem>
                        <IonItem className='ion-no-padding'>
                            <IonLabel position="floating">Description</IonLabel>
                            <IonTextarea value={description} placeholder="Tell us about this recipe" onIonChange={e => setDescription(e.detail.value!)} clearOnEdit></IonTextarea>
                        </IonItem>
                        {/* <IonItemDivider className='ion-padding ion-text-center'>
                        <IonList className="ion-text-center">
                            {
                                ingredients.map((ing, i) => (
                                    <IonLabel key={i} >
                                        <h3>{ing}</h3></IonLabel>
                                ))
                            }
                        </IonList>
                    </IonItemDivider>
                    <IonItem className='ion-no-padding'>
                        <IonLabel >Add Ingredient</IonLabel>
                        <IonFabButton className='ingredient-add-button' onClick={AddIngredient}>
                            <IonIcon icon={add} />
                        </IonFabButton>
                    </IonItem>

                    <IonItem className='ion-no-padding'>
                        <IonRow>
                            <IonTextarea value={ingredient} placeholder="name of Ingredient" onIonChange={e => setIngredient(e.detail.value!)} ></IonTextarea>
                        </IonRow>
                    </IonItem> */}

                        <IonButton className='ion-margin-top' type='submit' expand='block' >Submit</IonButton>

                    </IonList>
                </IonGrid>
            </form>
        </IonContent>
    );
};