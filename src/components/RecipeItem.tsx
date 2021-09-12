import React from 'react';
// import { Session } from '../models/Schedule';
// import { Speaker } from '../models/Speaker';
import placeHolderImage from './../assets/Images/placeholder.jpg';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList, IonIcon } from '@ionic/react';
import { IRecipe } from '../Data/CTX/types';
import { leaf, peopleCircleOutline, peopleOutline, shieldCheckmark, shieldOutline } from 'ionicons/icons';

// export interface Speaker {
//   id: number;
//   name: string;
//   profilePic: string;
//   twitter: string;
//   instagram: string;
//   about: string;
//   title: string;
//   email: string;
// }

interface RecipeItemProps {
  recipe: IRecipe;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => {
  const recipeImage = recipe.photos && recipe.photos.length ? recipe.photos[0].fileUrl : placeHolderImage;
  return (
    <>
      <IonCard className="recipe-card " style={{ width: '100%' }}>
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="recipe-item" routerLink={`/recipe/${recipe.id}`}>
            <IonAvatar slot="start" className='recipe-img'>
              <img src={recipeImage} alt="Recipe profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{recipe.title}</h2>
              <p>by {recipe.chef}</p>
            </IonLabel>
            <IonIcon color={recipe.privacy ? 'secondary' : 'success'} icon={recipe.privacy ? peopleCircleOutline : peopleOutline} />
          </IonItem>
        </IonCardHeader>

        <IonCardContent>

          <IonList lines="none">
            <IonItem detail={false} >
              <IonLabel>
                {recipe.cookTime ? <p className='mb-2'>cook time:  {`${recipe.cookTime?.split('\n')[0]}h ${recipe.cookTime?.split('\n')[1]}m`}</p> : null}
                <h3>{recipe.description}</h3>
              </IonLabel>
            </IonItem>
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default RecipeItem;