import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonListHeader, IonMenuButton, IonNote, IonPage, IonRoute, IonSkeletonText, IonSpinner, IonThumbnail, IonTitle, IonToolbar } from "@ionic/react"
import React, { useContext, useEffect } from "react"
import { RouteComponentProps, useHistory } from 'react-router';
import { AppContext } from "../Data/CTX/AppContext";
import './recipeCard.scss';
import { bookmarkOutline, receipt, time, timeOutline } from "ionicons/icons";
type Props = {
    match: {
        params: {
            id: string
        }
    };
};

const RecipeCard: React.FC<Props> = (props) => {
    const { getRecipeById, recipe, resetRecipe } = useContext(AppContext)
    const { id } = props.match.params;
    let queryRecipe: NodeJS.Timeout
    const history = useHistory();
    useEffect(() => {
        //     history.listen((location, action)=>{
        //         console.log(location,action)
        //     })
        //    queryRecipe = setTimeout(()=>getRecipeById({ id }),20000) 
        getRecipeById({ id })
        return () => {
            resetRecipe();
            return clearTimeout(queryRecipe)
        }
    }, [id]);


    // useEffect(()=>()=>clearTimeout(queryRecipe))
    console.log(recipe)

    return <IonPage id="recipe-card">
        <IonHeader translucent={true} className="ion-no-border" >
            <IonToolbar >
                <IonButtons slot="start">
                    <IonBackButton defaultHref='/recipes' />
                </IonButtons>
                <IonTitle>{recipe?.title}</IonTitle>
                <IonButtons slot="end">
                    <IonButton>
                        <IonIcon icon={bookmarkOutline} />
                    </IonButton>
                </IonButtons>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonCard className='recipe_card'>
                {recipe ? (<> <div className='recipe_card-main-image-container position-relative'>
                    <IonImg className='recipe_card-main-image' src={recipe.photos[0].fileUrl} />
                    {recipe.cookTime ? <IonChip color="light" className='recipe_card-main-image-info--cookTime'>
                        <IonIcon color="dark" icon={timeOutline} />
                        <IonLabel color="dark">
                            {`${recipe.cookTime?.split('\n')[0]}h ${recipe.cookTime?.split('\n')[1]}m`}
                        </IonLabel>
                    </IonChip> : null}
                </div>
                    <IonCardHeader>
                        <IonCardTitle>{recipe.title}</IonCardTitle>
                        <IonCardSubtitle>by {recipe.chef}</IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {recipe.description}
                    </IonCardContent>
                    <IonCardContent>
                        <IonCardTitle color='dark' className='mb-1' style={{ fontSize: '1.2em' }}>Ingredients</IonCardTitle>
                        <IonList>
                            {recipe.ingredients?.split('\n').map((ingredient, i) => <div key={i}><IonNote >{ingredient}</IonNote><br /></div>)}
                        </IonList>
                    </IonCardContent>
                    <IonCardContent>
                        <IonCardTitle color='dark' className='mb-1' style={{ fontSize: '1.2em' }}>Instructions</IonCardTitle>
                        {recipe.instructions}
                    </IonCardContent>
                </>)
                    :
                    null
                }
            </IonCard>
        </IonContent>
    </IonPage>
}

export default RecipeCard;