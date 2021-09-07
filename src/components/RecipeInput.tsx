import React, { useContext, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonGrid, IonRow, IonTextarea, IonCol, IonFab, IonFabButton, IonIcon, IonSelect, IonSelectOption, IonButton, IonToast, IonImg, IonChip } from '@ionic/react';
import { IRecipe } from '../Data/CTX/types';
import { AppContext } from '../Data/CTX/AppContext';
import { useHistory } from 'react-router';
import { usePhotoGallery } from '../Utils/Camera';
import { alertOutline, camera, helpCircleOutline, shieldCheckmark, shieldOutline, trashBinOutline } from 'ionicons/icons';
import './recipeInput.scss';

export const RecipeInput: React.FC = () => {
    const { photos, takePhoto } = usePhotoGallery();
    const { recipeApi } = useContext(AppContext);
    const [description, setDescription] = useState<string>('');
    const [chef, setChef] = useState<string>();
    const [title, setTitle] = useState<string>();
    const [privacy, setPrivacy] = useState<boolean>(true);
    const [ingredient, setIngredient] = useState<string>('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitRes, setSubmitRes] = useState('');
    const history = useHistory();
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
        if (title && chef) {
            const recipe: IRecipe = { title, chef, description, privacy };
            const res = await recipeApi.createNewRecipe(recipe);
            if (res.status === 201) {
                await recipeApi.uploadImage(res.data.id, photos[0].blobData, 'test', 'jpeg');
                setSubmitRes('New Recipe has been created!')
            } else {
                setSubmitRes('error in creating new recipe')
            }
        }
        setFormSubmitted(true);
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

    const submitAction = () => {
        setFormSubmitted(false)
        history.push('/recipes')
    };

    return (
        <IonContent>
            <IonToast
                position='top'
                color={submitRes === 'New Recipe has been created!' ? 'success' : 'danger'}
                isOpen={formSubmitted}
                onDidDismiss={submitAction}
                message={submitRes}
                duration={1000}
            />
            <IonButton onClick={takePhoto} color='danger'>
                <IonIcon icon={camera} />
            </IonButton>
            <IonGrid>
                <IonRow>
                    {photos.map((photo, index) => (
                        <IonCol size="12" key={index} className='recipe-image-container'>
                            <IonImg src={'data:image/jpeg;base64,' + photo.fileUrl} />
                            <IonFabButton color="danger" >
                                <IonIcon icon={trashBinOutline} />
                            </IonFabButton>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
            <form noValidate onSubmit={submitRecipe}>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonChip color={privacy ? 'success' : 'default'} onClick={() => setPrivacy(!privacy)}>
                            <IonIcon icon={privacy ? shieldCheckmark : shieldOutline} />
                            <IonLabel>Private</IonLabel>
                        </IonChip>
                    </IonRow>
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