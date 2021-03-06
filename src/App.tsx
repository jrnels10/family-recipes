import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonBackdrop,
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
import AppProvider, { AppContext } from './Data/CTX/AppContext';
import { Signup } from './pages/Signup';
import RedirectToLogin from './components/RedirectToLogin';
import {NewRecipe} from './pages/NewRecipe';
import UserAccnt from './pages/UserAccnt';
import { RecipeMain } from './pages/RecipeMain';
import RecipePage from './pages/RecipePage';
import { useContext } from 'react';


const App: React.FC = () => {
  return (
    <IonReactRouter>
      <AppProvider>
        <IonicApp />
      </AppProvider>
    </IonReactRouter>
  );
};
const IonicApp: React.FC = () => {
  const { saving } = useContext(AppContext);
  return <IonApp>
    <MenuNavigator />
    {saving ? <IonBackdrop className='save-backdrop' /> : null}
    <IonTabs>
      <IonRouterOutlet>
        {/* <IonRouteR from="/" to="/recipes"></ion-route-redirect> */}
        <Route path="/recipes" render={() => <RecipeList />} exact={true} />
        <Route path="/recipe/:id" component={RecipePage} exact={true} />
        {/* <Route path="/recipe/:id" exact component={RecipeCard} /> */}
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
};

export default App;
