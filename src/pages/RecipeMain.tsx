import React  from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRoute } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, location, informationCircle, people, add, documentTextOutline, person } from 'ionicons/icons';
import RecipeList from './RecipeList';
import RecipeCard from './RecipePage';

interface MainTabsProps { }

export const RecipeMain: React.FC<MainTabsProps> = () => {

  return (
      <IonRouterOutlet>
        {/* <Redirect exact path="/" to="/tabs/schedule" /> */}
        {/*
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
        <Route path="/" render={() => <RecipeList />} exact={true} />
        <Route path="/recipes/:id"  component={RecipeCard} exact={true} />
        {/* <Route path="//schedule" render={() => <SchedulePage />} exact={true} />
        <Route path="/tabs/schedule/:id" component={SessionDetail} />
        <Route path="/tabs/speakers/sessions/:id" component={SessionDetail} />
        <Route path="/tabs/map" render={() => <MapView />} exact={true} />
        <Route path="/tabs/about" render={() => <About />} exact={true} /> */}
      </IonRouterOutlet>
  );
};