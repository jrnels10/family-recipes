import { IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { closeCircleOutline, ellipsisVerticalCircle, ellipsisVerticalCircleOutline, ellipsisVerticalOutline, filterCircle, filterCircleOutline } from 'ionicons/icons';
import { useContext, useEffect, useState } from 'react';
import { useLocation, withRouter } from 'react-router';
import { Modal } from '../components/Modal';
import RecipeItem from '../components/RecipeItem';
import { Searchbar } from '../components/Searchbar';
import { AppContext } from '../Data/CTX/AppContext';
import './recipeList.scss';

const RecipeList: React.FC = () => {
  const { recipes, loadingRecipes, getRecipes, user } = useContext(AppContext);
  useEffect(() => {
    console.log('validated', user.validated)
    if (user.validated) {
      getRecipes({});
    }
  }, [user]);

  const searchInput = (search: string) => {
    getRecipes({ search: search.toLocaleLowerCase() });
  }

  return (
    <IonPage id="recipe-list">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Recipes</IonTitle>
          <IonButtons slot="end">
            <Modal />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loadingRecipes ? <IonSpinner className='spin' name="crescent" /> : null}
        <IonGrid fixed={true}>
          <IonRow style={{ width: '100%' }}>
            <Searchbar placeholder='search recipes' searchInput={searchInput} />
            {recipes.map((recipe, i) => (
              <RecipeItem
                key={recipe.id}
                recipe={recipe}
              />
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default withRouter(RecipeList);

// import React from 'react';
// import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonGrid, IonRow, IonCol } from '@ionic/react';
// import SpeakerItem from '../components/SpeakerItem';
// import { Speaker } from '../models/Speaker';
// import { Session } from '../models/Schedule';
// import { connect } from '../data/connect';
// import * as selectors from '../data/selectors';
// import './SpeakerList.scss';

// interface OwnProps { };

// interface StateProps {
//   speakers: Speaker[];
//   speakerSessions: { [key: string]: Session[] };
// };

// interface DispatchProps { };

// interface SpeakerListProps extends OwnProps, StateProps, DispatchProps { };

// const SpeakerList: React.FC<SpeakerListProps> = ({ speakers, speakerSessions }) => {

//   return (
//     <IonPage id="speaker-list">
//       <IonHeader translucent={true}>
//         <IonToolbar>
//           <IonButtons slot="start">
//             <IonMenuButton />
//           </IonButtons>
//           <IonTitle>Speakers</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen={true}>
//         <IonHeader collapse="condense">
//           <IonToolbar>
//             <IonTitle size="large">Speakers</IonTitle>
//           </IonToolbar>
//         </IonHeader>

//           <IonGrid fixed>
//             <IonRow>
//               {speakers.map(speaker => (
//                 <IonCol size="12" size-md="6" key={speaker.id}>
//                   <SpeakerItem
//                     key={speaker.id}
//                     speaker={speaker}
//                     sessions={speakerSessions[speaker.name]}
//                   />
//                 </IonCol>
//               ))}
//             </IonRow>
//           </IonGrid>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default connect<OwnProps, StateProps, DispatchProps>({
//   mapStateToProps: (state) => ({
//     speakers: selectors.getSpeakers(state),
//     speakerSessions: selectors.getSpeakerSessions(state)
//   }),
//   component: React.memo(SpeakerList)
// });