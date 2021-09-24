import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RecipeInput } from './../components/RecipeInput';
import './newRecipe.scss';

export const NewRecipe: React.FC = () => {
  return (
    <IonPage id='new_recipe'>
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

