import React, { useContext, useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './Login.scss';
import { RouteComponentProps } from 'react-router';
import { IUser } from '../Data/CTX/types';
import { AppContext } from '../Data/CTX/AppContext';
import { User } from '../Data/Constructors/User';
interface OwnProps extends RouteComponentProps { }

interface DispatchProps {
  setIsLoggedIn: boolean;
  setUsername: IUser;
}
interface LoginProps extends OwnProps, DispatchProps { }



export const Signup: React.FC<LoginProps> = ({ setIsLoggedIn, history, setUsername: setUsernameAction }) => {
  const {   } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
    );
    setFormSubmitted(true);
    if (!email) {
      setEmailError(true);
    }
    if (!firstName) {
      setFirstNameError(true);
    }
    if (!lastName) {
      setLastNameError(true);
    }
    if (!password || !pattern.test(password)) {
      setPasswordError(true);
    };
    if (!email || !firstName || !lastName || !password || !pattern.test(password)) {
      return;
    }
    const user = new User({ email, firstName, lastName, password })
    if (user && password) {
      // const res = await api.signup(user);
      debugger
      await //setUserAcc(true);
      // await setUsernameAction(username);
      history.push('/login', { direction: 'none' });
    }
  };

  return (
    <IonPage id="signup-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>

        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Email</IonLabel>
              <IonInput name="email" type="text" value={email} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setEmail(e.detail.value!);
                setEmailError(false);
              }}
                required>
              </IonInput>
            </IonItem>
            {formSubmitted && emailError && <IonText color="danger">
              <p className="ion-padding-start">
                Email is required
              </p>
            </IonText>}
            <IonItem>
              <IonLabel position="stacked" color="primary">First Name</IonLabel>
              <IonInput name="firstname" type="text" value={firstName} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setFirstName(e.detail.value!);
                setFirstNameError(false);
              }}
                required>
              </IonInput>
            </IonItem>
            {formSubmitted && firstNameError && <IonText color="danger">
              <p className="ion-padding-start">
                First name is required
              </p>
            </IonText>}
            <IonItem>
              <IonLabel position="stacked" color="primary">Last Name</IonLabel>
              <IonInput name="lastName" type="text" value={lastName} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setLastName(e.detail.value!);
                setLastNameError(false);
              }}
                required>
              </IonInput>
            </IonItem>
            {formSubmitted && lastNameError && <IonText color="danger">
              <p className="ion-padding-start">
                Last name is required
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => {
                setPassword(e.detail.value!);
                setPasswordError(false);
              }}>
              </IonInput>
            </IonItem>
            <IonText color="danger">
              <p className="ion-padding-start">
              </p>
            </IonText>
            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Password must contain at least one uppercase and lowercase letter and one number or special character
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Create</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};