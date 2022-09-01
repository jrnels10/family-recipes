import React, { useCallback, useContext, useRef, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonThumbnail,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from "@ionic/react";

import { img } from "../util";
import { AppContext } from "../context/Context";
import { IRecipe } from "../context/interfaces";

const Search = () => {
  const { state, dispatch, recipeService } = useContext(AppContext);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedRecipes, setSearchedRecipes] = useState<IRecipe[]>([]);
  const searchbarRef: any = useRef();

  const doSearch = useCallback(
    async (e) => {
      const q = e.target.value;

      if (!q) {
        setSearchedRecipes([]);
        return;
      }
      const recipes = await recipeService.getRecipes(q);
      // setSearchedRecipes(recipes);
    },
    [searchedRecipes]
  );

  const doPlay = useCallback((track) => {
    // dispatch(playTrack(track))
  }, []);

  // Use this pattern to focus a search box whenever the
  // page enters from a navigation event
  useIonViewDidEnter(() => {
    searchbarRef?.current?.setFocus();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar ref={searchbarRef} onIonChange={doSearch} animated />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {searchedRecipes.map((recipe) => (
          <IonItem
            key={recipe.title}
            onClick={() => console.log(recipe)}
            button
          >
            <IonThumbnail slot="start">
              <img src={img(recipe.image)} alt="searched recipe" />
            </IonThumbnail>
            <IonLabel>
              <h2>{recipe.title}</h2>
            </IonLabel>
          </IonItem>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Search;
