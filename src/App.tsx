import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonHeader,
  IonIcon,
  IonLabel,
  IonMenuToggle,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { documentTextOutline, ellipse, square, triangle } from 'ionicons/icons';
import RecipeList from './pages/RecipeList';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { MenuNavigator } from './components/Menu';
import { Login } from './pages/Login'
// import { AppContextProvider } from './Data/Context';
import AppProvider from './Data/CTX/AppContext';
import { Signup } from './pages/Signup';
import RedirectToLogin from './components/RedirectToLogin';

const App: React.FC = () => {
  return (
    <IonReactRouter>
      <AppProvider>
        <IonicApp />
      </AppProvider>
    </IonReactRouter>
  );
};
const IonicApp: React.FC = () => (
  <IonApp>
    <MenuNavigator />
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tab/recipes">
          <RecipeList />
        </Route>
        {/* <Route path="/account" component={Account} /> */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/support" component={Support} /> */}
        <Route path="/logout" render={() => {
          return <RedirectToLogin />;
        }} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab/recipes">
          <IonIcon icon={documentTextOutline} />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon icon={ellipse} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon icon={square} />
          <IonLabel>Tab 3</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonApp>
);

export default App;
