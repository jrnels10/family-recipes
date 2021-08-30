import { IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonMenuButton, IonMenuToggle, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useContext } from 'react';
import SpeakerItem from '../components/RecipeItem';
import { AppContext } from '../Data/CTX/AppContext';
import './Tab1.css';

const RecipeList: React.FC = () => {
  const { recipes, user, addRecipe } = useContext(AppContext);

  return (
    <IonPage id="recipe-list">
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Recipes</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid fixed>
          <IonRow>
            <div>
              {recipes.map((recipe, i) => (
                <IonCol size="12" size-md="6" key={recipe.title}>
                  <SpeakerItem
                    key={recipe.title}
                    recipe={recipe}
                  />
                  <div key={i}>{recipe.title}</div>
                </IonCol>
              ))}
            </div>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default RecipeList;

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