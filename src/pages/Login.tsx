import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonLoading,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/react";
import React, { useContext, useRef, useState } from "react";

import { AppContext } from "../context/Context";

import { login } from "../Auth";
import urls from "../urls";

import "./Form.css";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

export const Login = ({ history }: any) => {
  const { dispatch } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState(null);
  const [showLoading, setShowLoading] = useState(false);

  const formRef = useRef(null);

  const goTo = (path: any) => {
    history.push(path, { direction: "forward" });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setShowLoading(true);

      const user = await login(email, password);

      //   dispatch(loggedIn(user));

      history.replace(urls.APP_HOME);

      setShowLoading(false);
    } catch (e) {
      console.error(e);
      setShowLoading(false);
      setFormErrors(e);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="light">
          <IonButtons slot="start">
            <IonBackButton defaultHref={`/`} />
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="form">
        <IonLoading
          isOpen={showLoading}
          message="Logging in..."
          onDidDismiss={() => setShowLoading(false)}
        />
        <form onSubmit={handleSubmit} method="post" ref={formRef} action="">
          <IonList>
            <IonItem>
              <IonLabel position={"fixed"}>Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onInput={(e: any) => setEmail(e.currentTarget.value)}
              />
            </IonItem>
            <IonItem>
              <IonLabel position={"fixed"}>Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onInput={(e: any) => setPassword(e.currentTarget.value)}
              />
            </IonItem>
            <IonButton expand="block" type="submit">
              <LoginButton />
            </IonButton>
          </IonList>
        </form>
        <LogoutButton />
      </IonContent>
    </IonPage>
  );
};
