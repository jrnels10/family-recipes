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

const SpeakerItem: React.FC<RecipeItemProps> = ({ recipe }) => {
  return (
    <>
      <IonCard className="speaker-card">
        <IonCardHeader>
          <IonItem button detail={false} lines="none" className="speaker-item" routerLink={`/tabs/speakers/${recipe.title}`}>
            <IonAvatar slot="start">
              <img src={process.env.PUBLIC_URL + recipe.image} alt="Speaker profile pic" />
            </IonAvatar>
            <IonLabel>
              <h2>{recipe.title}</h2>
              <p>{recipe.chef}</p>
            </IonLabel>
          </IonItem>
        </IonCardHeader>

        <IonCardContent>
          {/* <IonList lines="none">
            {sessions.map(session => (
              <IonItem detail={false} routerLink={`/tabs/speakers/sessions/${session.id}`} key={session.name}>
                <IonLabel>
                  <h3>{session.name}</h3>
                </IonLabel>
              </IonItem>
            ))}
            <IonItem detail={false} routerLink={`/tabs/speakers/${speaker.id}`}>
              <IonLabel>
                <h3>About {speaker.name}</h3>
              </IonLabel>
            </IonItem>
          </IonList> */}
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default SpeakerItem;