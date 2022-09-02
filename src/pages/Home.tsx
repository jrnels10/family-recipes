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
  IonCard,
  IonIcon,
  IonSkeletonText,
} from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { AppContext, setViewer } from "../context/Context";
import { img } from "../util";
import moment from "moment";
import { BoxedImage } from "../components/Images";

export const Home = () => {
  const { state, dispatch, getPopularRecipes, getRecipes, setViewerRecipe } =
    useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const { popularRecipes, recipes } = state;
  const recentRecipes = recipes
    .filter((recipe) => {
      return moment(recipe.created).isAfter(moment().subtract(30, "days"));
    })
    .sort((a, b) => moment(b.created).diff(moment(a.created)));

  useEffect(() => {
    getPopularRecipes();
    getRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length || popularRecipes.length) {
      setLoading(false);
    }
  }, [recipes, popularRecipes]);

  console.log(popularRecipes);
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
          {loading && <PopularSkeleton />}
          {popularRecipes.map((recipe) => (
            <IonItem
              key={recipe.id}
              onClick={() => setViewerRecipe(recipe.id)}
              button
            >
              <IonThumbnail slot="start">
                {recipe.image ? (
                  <img src={img(recipe.image)} alt="popular recipe" />
                ) : (
                  <IonCard>
                    <IonIcon icon="pizza" />
                  </IonCard>
                )}
              </IonThumbnail>
              <IonLabel>
                <h2>{recipe.title}</h2>
                <p>
                  {recipe.likedcount}{" "}
                  {`like${recipe.likedcount.toString() !== "1" ? "s" : ""}`}
                </p>
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
              {loading && <RecentSkeletion />}
              {recentRecipes.map((recipe) => (
                <IonCol
                  size="6"
                  className="new-track"
                  key={recipe.title}
                  onClick={() => setViewerRecipe(recipe.id)}
                >
                  <BoxedImage image={img(recipe.image)} alt="recipe recipe" />
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

const PopularSkeleton = () => {
  return (
    <>
      {[1, 2, 3].map((num) => (
        <IonItem key={num}>
          <IonThumbnail slot="start" style={{ margin: "10px 10px 0px 0px" }}>
            <IonSkeletonText
              animated
              style={{ width: "100%", height: "40px" }}
            />
          </IonThumbnail>
          <IonLabel>
            <IonSkeletonText
              animated
              style={{ width: "100%", height: "40px" }}
            />
          </IonLabel>
        </IonItem>
      ))}
    </>
  );
};

const RecentSkeletion = () => {
  return (
    <>
      {[1, 2, 3, 4].map((num) => (
        <IonCol size="6" className="new-track" key={num}>
          <IonSkeletonText
            animated
            style={{ width: "100%", height: "150px", borderRadius: "5px" }}
          />
        </IonCol>
      ))}
    </>
  );
};
