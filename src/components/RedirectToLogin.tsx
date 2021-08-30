import React, { useEffect, useContext } from 'react';
import { IonRouterContext } from '@ionic/react';
import { AppContext } from '../Data/CTX/AppContext';
import { User } from '../Data/Constructors/User';


const RedirectToLogin: React.FC = () => {
  const {setUserAcc} = useContext(AppContext);
  const ionRouterContext = useContext(IonRouterContext);
  useEffect(() => {
    const user = new User({});
    user.signOut();
    setUserAcc(user); 
    ionRouterContext.push('/login')
  }, []);
  return null;
};

export default RedirectToLogin;
