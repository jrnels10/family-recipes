import React, { useCallback, useContext, useState } from 'react';

import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonListHeader, IonItem, IonThumbnail, IonLabel,
  IonButtons, IonButton, IonIcon, IonPopover
} from '@ionic/react';

import { ellipsisVertical, removeCircleOutline } from 'ionicons/icons';


import { img } from '../util';
import moment from 'moment';
import urls from '../urls';
import { useAuth0 } from '@auth0/auth0-react';
import { AppContext } from '../context/Context';

const You = ({ history }) => {
  const { state, dispatch } = useContext(AppContext);
  const { logout}=useAuth0()
  const [showUserMenuEvent, setShowUserMenuEvent] = useState(null);
  const recentViewedRecipes = state.recipes.filter((recipe) => {
    return moment(recipe.created).isAfter(moment().subtract(30, "days"));
  });

  const doLogout = useCallback(async () => {
    setShowUserMenuEvent(null);
    dispatch(logout());
    history.push(urls.LOGIN);
  }, [dispatch, history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Your Library</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={e => { e.persist(); setShowUserMenuEvent(e) }}>
              <IonIcon icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonPopover
            event={showUserMenuEvent}
            isOpen={!!showUserMenuEvent}
            onDidDismiss={() => setShowUserMenuEvent(null)}>
          <IonContent>
            <IonList>
              <IonItem onClick={e => { e.preventDefault(); doLogout()}} detail={true} href="">
                <IonLabel>Log out</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
        <IonList>
          <IonListHeader>
            <IonLabel>Recently Viewed</IonLabel>
          </IonListHeader>
          {recentViewedRecipes.map((recipe) => (
            <IonItem
              key={recipe.title}
              onClick={() => console.log("recipe")}
              button
            >
              <IonThumbnail slot="start">
                <img src={recipe.img} alt="recently viewed recipe" />
              </IonThumbnail>
              <IonLabel>
                <h2>{recipe.title}</h2>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
        
        <IonList>
          <IonListHeader>
            <IonLabel>My Favorite Tracks</IonLabel>
          </IonListHeader>
          {/* {favTracks.map(track => (
            <IonItem key={track.title} onClick={() => doPlay(track)} button>
              <IonThumbnail slot="start">
                <img src={img(track.img)}/>
              </IonThumbnail>
              <IonLabel>
                <h2>{track.title}</h2>
                <p>{track.artist}</p>
              </IonLabel>
              <IonIcon
                onClick={e => { e.stopPropagation(); dispatch(favTrack(track))}}
                icon={removeCircleOutline} slot="end" />
            </IonItem>
          ))} */}

        </IonList>            
      </IonContent>
    </IonPage>
  );
};

export default You;
