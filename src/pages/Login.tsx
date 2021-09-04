import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './Login.scss'
import { IUser } from './../Data/CTX/types'
// import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { RouteComponentProps, useHistory } from 'react-router';
import { useContext } from 'react';
import { AppContext } from '../Data/CTX/AppContext';
import { User } from '../Data/Constructors/User';

interface OwnProps extends RouteComponentProps { }

interface DispatchProps {
  setIsLoggedIn: boolean;
  setUsername: IUser;
}

interface LoginProps extends OwnProps, DispatchProps { }

export const Login: React.FC<LoginProps> = ({ setIsLoggedIn, history, setUsername: setUsernameAction }) => {
  const { setUserAcc } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailError, SetEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userError, setUserError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    const pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );
    if (!email) {
      SetEmailError(true);
    }
    if (!password || !pattern.test(password)) {
      setPasswordError(true);
    };
    if (!email || !password || !pattern.test(password)) {
      return;
    }
    if (email && password) {
      const user = new User({ email, password, history, errorHandler: setUserError });
      await user.signIn();
      setUserAcc(user);
      history.push('/recipes', { direction: 'none' });
    }
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          Family Recipes
          {/* <img src="assets/img/appicon.svg" alt="Ionic logo" /> */}
        </div>

        <form noValidate onSubmit={login}>
          <IonList>
            {formSubmitted && userError && <IonText color="danger">
              <p className="ion-padding-start">
                Email and/or Password are incorrect
              </p>
            </IonText>}
            <IonItem>
              <IonLabel position="stacked" color="primary">Email</IonLabel>
              <IonInput name="email" type="text" value={email} spellCheck={false} autocapitalize="off" onIonChange={e => setEmail(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && emailError && <IonText color="danger">
              <p className="ion-padding-start">
                Email is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
              Password must contain at least one uppercase and lowercase letter and one number or special character
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Login</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};
