import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonNote, IonPage, IonRoute, IonSkeletonText, IonSpinner, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react"
import React, { useContext, useEffect, useState } from "react"
import { RouteComponentProps, useHistory, useLocation } from 'react-router';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppContext } from "../Data/CTX/AppContext";
import './recipeCard.scss';
import { add, bookmarkOutline, create, logoFacebook, logoTwitter, logoWhatsapp, receipt, save, share, shareOutline, shareSharp, telescope, text, textOutline, textSharp, time, timeOutline } from "ionicons/icons";
import { RecipeImage } from "../components/RecipeCard/RecipeImage";
import { CookTime } from "../components/RecipeCard/CookTime";
import { RecipeCardBody } from "../components/RecipeCard/RecipeBody";
import { RecipeCard } from "../components/RecipeCard/RecipeCard";
type Props = {
    match: {
        params: {
            id: string
        }
    };
    from: string


};


const RecipePage: React.FC<Props> = (props) => {
    const { getRecipeById, recipe, user, resetRecipe, recipeUpdates, updateRecipe, saveUpdate, saving } = useContext(AppContext);
    const [mode, setMode] = useState(recipeUpdates ? 'save' : recipe && user.id === recipe.userId ? 'edit' : 'view')
    const [edit, setEdit] = useState(false);
    const { id } = props.match.params;
    const history = useHistory<Props>();
    useEffect(() => {
        getRecipeById({ id });
        return () => {
            resetRecipe();
            updateRecipe();
        }
    }, [id]);

    useEffect(() => {
        setMode(recipeUpdates ? 'save' : recipe && user.id === recipe.userId ? 'edit' : 'view');
    }, [recipeUpdates, recipe, user]);


    useEffect(() => {
        if (saving) {
            setEdit(false);
        }
    }, [saving]);
    
    return <IonPage id="recipe-card">
        <IonHeader translucent={true} className="ion-no-border" >
            <IonToolbar >
                <IonButtons slot="start">
                    {history.location.state && history.location.state.from === '/new-recipe' ? <IonMenuButton /> : <IonBackButton defaultHref='/recipes' />}
                </IonButtons>
                <IonTitle>{recipe?.title}</IonTitle>
                {
                    mode === 'edit' ? <IonButtons slot="end" >
                        <IonButton onClick={() => setEdit(!edit)} >
                            <IonIcon icon={create} style={{opacity:edit?0.4:1}}/>
                        </IonButton>
                    </IonButtons> :
                        mode === 'save' ? <IonButtons slot="end">
                            <IonButton color='warning' onClick={saveUpdate}>
                                <IonIcon icon={save} />
                            </IonButton>
                        </IonButtons> : null
                }
                {
                    mode === 'save' ? null : <IonButtons slot="end">
                        <IonButton >
                            <IonIcon icon={bookmarkOutline} />
                        </IonButton>
                    </IonButtons>}
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <RecipeCard recipe={recipe} edit={edit} />
            {/* <IonCard className='recipe_card'>
                {recipe ? (<>
                    <RecipeImage recipe={recipe} edit={edit} />
                    <RecipeCardBody recipe={recipe} edit={edit} />
                </>)
                    :
                    null
                }

            </IonCard> */}
        </IonContent>
    </IonPage>
}

export default RecipePage;



