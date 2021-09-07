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
import { add, documentTextOutline, ellipse, person, square, triangle } from 'ionicons/icons';
import RecipeList from './pages/RecipeList';
import Tab2 from './pages/NewRecipe';
import Tab3 from './pages/UserAccnt';

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
import NewRecipe from './pages/NewRecipe';
import UserAccnt from './pages/UserAccnt';

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
        <Route path="/" component={RecipeList} exact/>
        <Route path="/recipes" component={RecipeList} />
        <Route path="/new-recipe" component={NewRecipe} />
        <Route path="/useraccnt" component={UserAccnt} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/logout" render={() => {
          return <RedirectToLogin />;
        }} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/recipes">
          <IonIcon icon={documentTextOutline} />
          <IonLabel>Recipes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/new-recipe">
          <IonIcon icon={add} />
          <IonLabel>New Recipe</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/useraccnt">
          <IonIcon icon={person} />
          <IonLabel>User</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonApp>
);

export default App;
