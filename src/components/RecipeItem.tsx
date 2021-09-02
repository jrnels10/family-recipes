import React from 'react';
// import { Session } from '../models/Schedule';
// import { Speaker } from '../models/Speaker';
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
  console.log(recipe)
  return (
    <>
      <IonCard className="recipe-card w-100">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="recipe-item" routerLink={`/tabs/speakers/${recipe.title}`}>
            <IonAvatar slot="start">
              <img src={recipe.photos[0].fileUrl} alt="Recipe profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{recipe.title}</h2>
              {/* <IonItem lines="none" className='header-link' detail={false} routerLink={`/tabs/recipe/${recipe.chef}`} > */}
                <p>by {recipe.chef}</p>
              {/* </IonItem> */}
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          <IonList lines="none">
            <IonItem detail={false} routerLink={`/tabs/recipe/${recipe.title}`} >
              <IonLabel>
                <h3>{recipe.title}</h3>
              </IonLabel>
            </IonItem>
            {/* <IonItem detail={false} routerLink={`/tabs/speakers/${speaker.id}`}> */}
            <IonLabel>
              <h3>{recipe.decription}</h3>
            </IonLabel>
            {/* </IonItem> */}
          </IonList>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default RecipeItem;