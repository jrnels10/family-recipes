import React, { useContext } from "react";

/* Theme variables */
import "./theme/variables.css";

import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

import {
  home,
  homeOutline,
  add,
  informationCircle,
  person,
  search,
} from "ionicons/icons";

import { AppContext } from "./context/Context";
import { Home } from "./pages/Home";
import Search from "./pages/Search";
import { Create } from "./pages/Create";
import You from "./pages/You";

// import Music  from './pages/Home';
// import Search from './pages/Search';
// import You    from './pages/You';
// import Track  from './pages/Track';
// import Readme from './pages/Readme';

// import TabBarSticky from './components/TabBarSticky';
// import TrackPreview from './components/TrackPreview';

const Tabs = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/app/browse" component={Home} exact={true} />
          <Route path="/app/search" component={Search} exact={true} />
          <Route path="/app/create" component={Create} exact={true} />
          <Route path="/app/account" component={You} />
          {/* <Route path="/app/track/:trackId" component={Track} />
        <Route path="/app/search/track/:trackId" component={Track} /> */}
          {/* <Route path="/app/readme" component={Readme} /> */}
          <Route
            path="/app/"
            render={() => <Redirect to="/app/browse" />}
            exact={true}
          />
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="browse" href="/app/browse">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="search" href="/app/search">
            <IonIcon icon={search} />
            <IonLabel>Search</IonLabel>
          </IonTabButton>
          <IonTabButton tab="account" href="/app/account">
            <IonIcon icon={person} />
            <IonLabel>Your Library</IonLabel>
          </IonTabButton>
          <IonTabButton tab="create" href="/app/create">
            <IonIcon icon={add} />
            <IonLabel>Create</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
};

export default Tabs;
