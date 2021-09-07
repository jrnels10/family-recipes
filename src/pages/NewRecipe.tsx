import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RecipeInput } from './../components/RecipeInput';
import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
        <IonHeader translucent={true}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
            <IonTitle >Add New Recipe</IonTitle>
          </IonToolbar>
        </IonHeader>
      <IonContent fullscreen>
        <RecipeInput />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
