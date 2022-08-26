// import { useAuth0 } from "@auth0/auth0-react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonListHeader,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonThumbnail,
} from "@ionic/react";
import { useContext, useEffect } from "react";
import { AppContext, setViewer } from "../context/Context";
import { img } from "../util";
import moment from "moment";
import { BoxedImage } from "../components/Images";

export const Home = () => {
  const { isAuthenticated, getIdTokenClaims, user } = useAuth0();
  const { state, dispatch, getPopularRecipes } = useContext(AppContext);
  const popularRecipes = state.recipes.filter((recipe) => recipe.popular);
  const recentRecipes = state.recipes.filter((recipe) => {
    return moment(recipe.created).isAfter(moment().subtract(30, "days"));
  });
  useEffect(() => getPopularRecipes(), []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonListHeader>
            <IonLabel>Popular</IonLabel>
          </IonListHeader>
          {popularRecipes.map((recipe) => (
            <IonItem
              key={recipe.title}
              onClick={() => dispatch(setViewer(recipe))}
              button
            >
              <IonThumbnail slot="start">
                <img src={recipe.img} alt="popular recipe" />
              </IonThumbnail>
              <IonLabel>
                <h2>{recipe.title}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonList>
          <IonListHeader>
            <IonLabel>Recently Added</IonLabel>
          </IonListHeader>
          <IonGrid>
            <IonRow>
              {recentRecipes.map((recipe) => (
                <IonCol
                  size="6"
                  className="new-track"
                  key={recipe.title}
                  onClick={() => console.log(recipe)}
                >
                  <BoxedImage image={recipe.img} alt="recipe recipe" />
                  <IonItem lines="none">
                    <IonLabel>
                      <h3>{recipe.title}</h3>
                      {/* <p>{track.artist}</p> */}
                    </IonLabel>
                  </IonItem>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
