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
import { useHistory } from "react-router";
import { AppContext, setViewer } from "../context/Context";
import { IRecipe } from "../context/interfaces";
import { img } from "../util";

export const Viewer = () => {
  const {
    dispatch,
    setFavoriteRecipe,
    state: { viewRecipe = {} as IRecipe },
  } = useContext(AppContext);
  const history = useHistory();
  const handleClose = () => {
    dispatch(setViewer(null));
    history.goBack();
    return;
  };

  const heartIcon = heartOutline;
  if (viewRecipe) {
    return (
      <IonModal isOpen={true}>
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
          <img src={img(viewRecipe.image)} alt="currently viewed recipe" />
          <h2>{viewRecipe.title}</h2>
        </IonContent>
      </IonModal>
    );
  }
  return null;
};
