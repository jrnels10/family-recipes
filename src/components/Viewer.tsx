import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { arrowDown, heart, heartOutline } from "ionicons/icons";
import { useContext, useState } from "react";
import { AppContext, setViewer } from "../context/Context";
import { img } from "../util";

export const Viewer = () => {
  const {
    dispatch,
    setFavoriteRecipe,
    state: { viewRecipe },
  } = useContext(AppContext);

  const handleClose = () => {
    dispatch(setViewer(null));
    return;
  };

  const heartIcon = heartOutline;
  if (viewRecipe) {
    return (
      <IonModal isOpen={true} onDidDismiss={handleClose}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton fill="clear" onClick={handleClose}>
                <IonIcon icon={arrowDown} />
              </IonButton>
            </IonButtons>
            <IonTitle>{viewRecipe.title}</IonTitle>
            <IonButtons slot="end">
              <IonButton
                fill="clear"
                onClick={() => setFavoriteRecipe(viewRecipe)}
              >
                <IonIcon icon={heartIcon} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="track-content">
          <img src={viewRecipe.img} alt="currently viewed recipe" />
          <h2>{viewRecipe.title}</h2>
        </IonContent>
      </IonModal>
    );
  }
  return null;
};
