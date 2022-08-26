import "./theme/variables.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonPage } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import urls from "./urls";
import { Login } from "./pages/Login";
import Tabs from "./Tabs";
import AppContextProvider from "./context/Context";
import { Viewer } from "./components/Viewer";

export const App = () => {
  return (
    <Auth0Provider
      domain={
        process.env.REACT_APP_AUTH0_DOMAIN
          ? process.env.REACT_APP_AUTH0_DOMAIN
          : ""
      }
      clientId={
        process.env.REACT_APP_AUTH0_CLIENT_ID
          ? process.env.REACT_APP_AUTH0_CLIENT_ID
          : ""
      }
      redirectUri={window.location.origin}
      audience={process.env.REACT_APP_AUTH0_AUDIENCE}
      scope="read:current_user update:current_user_metadata"
    >
      <AppContextProvider>
        <IonApp>
          <IonReactRouter>
            <IonPage>
              <IonRouterOutlet>
                <Route path={urls.LOGIN} component={Login} exact={true} />
                <Route
                  exact={true}
                  path="/"
                  render={() => <Redirect to={urls.APP_HOME} />}
                />
              </IonRouterOutlet>
              <Route path="/app" component={Tabs} />
              <Viewer />
            </IonPage>
          </IonReactRouter>
        </IonApp>
      </AppContextProvider>
    </Auth0Provider>
  );
};
