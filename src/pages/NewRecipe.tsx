import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import {RecipeInput} from './../components/RecipeInput';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
     
      <IonContent fullscreen>
        <IonHeader >
          <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
            <IonTitle >Add New Recipe</IonTitle>
          </IonToolbar>
        </IonHeader>
        <RecipeInput />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
