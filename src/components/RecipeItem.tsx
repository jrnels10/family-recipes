import React from 'react';
// import { Session } from '../models/Schedule';
// import { Speaker } from '../models/Speaker';
import placeHolderImage from './../assets/Images/placeholder.jpg';
import { IonCard, IonCardHeader, IonItem, IonLabel, IonAvatar, IonCardContent, IonList } from '@ionic/react';
import { IRecipe } from '../Data/CTX/types';

export interface Speaker {
  id: number;
  name: string;
  profilePic: string;
  twitter: string;
  instagram: string;
  about: string;
  title: string;
  location: string;
  email: string;
  phone: string;
}

export interface Session {
  id: number;
  timeStart: string;
  timeEnd: string;
  name: string;
  location: string;
  description: string;
  speakerNames: string[];
  tracks: string[];
}

interface RecipeItemProps {
  recipe: IRecipe;
  // sessions: Session[];
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe }) => {
  const recipeImage = recipe.photos && recipe.photos.length? recipe.photos[0].fileUrl:placeHolderImage;
  return (
    <>
      <IonCard className="recipe-card " style={{ width: '100%' }}>
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="recipe-item" routerLink={`/recipe/${recipe.id}`}>
            <IonAvatar slot="start" className='recipe-img'>
              <img  src={recipeImage} alt="Recipe profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{recipe.title}</h2>
              <p>by {recipe.chef}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
            {/* <IonItem detail={false} routerLink={`/tabs/recipe/${recipe.title}`} >
              <IonLabel>
                <h3>{recipe.title}</h3>
              </IonLabel>
            </IonItem> */}
            <IonItem detail={false} >
              <IonLabel>
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