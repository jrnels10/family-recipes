import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { RecipeInput } from './../components/RecipeInput';
import './newRecipe.scss';

const Tab2: React.FC = () => {
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

export default Tab2;
