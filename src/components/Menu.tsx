import React, { useContext } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonMenuToggle, IonIcon, IonLabel, IonListHeader, IonToggle } from '@ionic/react';
import { calendarOutline, hammer, moonOutline, help, informationCircleOutline, logIn, logOut, mapOutline, peopleOutline, person, personAdd, documentTextOutline, pencilSharp, pencilOutline } from 'ionicons/icons';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';
import { AppContext } from '../Data/CTX/AppContext';

const routes = {
    appPages: [
        { title: 'Recipes', path: '/tab/recipes', icon: documentTextOutline, authenticated: false },
        { title: 'New Recipe', path: '/tabs/new-recipe', icon: pencilOutline, authenticated: true },
        { title: 'Map', path: '/tabs/map', icon: mapOutline, authenticated: false },
        { title: 'About', path: '/tabs/about', icon: informationCircleOutline, authenticated: false },
    ],
    loggedInPages: [
        { title: 'Account', path: '/account', icon: person, authenticated: true },
        { title: 'Support', path: '/support', icon: help, authenticated: true },
        { title: 'Logout', path: '/logout', icon: logOut, authenticated: true },
    ],
    loggedOutPages: [
        { title: 'Login', path: '/login', icon: logIn, authenticated: false },
        { title: 'Support', path: '/support', icon: help, authenticated: false },
        { title: 'Signup', path: '/signup', icon: personAdd, authenticated: false },
    ]
};

interface Pages {
    title: string,
    path: string,
    icon: string,
    authenticated: boolean,
    routerDirection?: string
};

export const MenuNavigator: React.FC = () => {
    const { user: { isLoggedin } } = useContext(AppContext);
    const location = useLocation();
    console.log(isLoggedin)
    function renderlistItems(list: Pages[]) {
        return list
            .filter(route => !!route.path )
            .filter(route => (!isLoggedin && !route.authenticated)|| isLoggedin)
            .map(p => {
                return <IonMenuToggle key={p.title} auto-hide="false">
                    <IonItem detail={false} routerLink={p.path} routerDirection="none" className={location.pathname.startsWith(p.path) ? 'selected' : undefined}>
                        <IonIcon slot="start" icon={p.icon} />
                        <IonLabel>{p.title}</IonLabel>
                    </IonItem>
                </IonMenuToggle>
            });
    }

    return <>
        <IonMenu side="start" contentId="my-content" menuId='menu-id'>
            <IonHeader>
                <IonToolbar >
                    <IonTitle>Menu</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonListHeader>Recipes</IonListHeader>
                    {renderlistItems(routes.appPages)}
                </IonList>
                <IonList lines="none">
                    <IonListHeader>Account</IonListHeader>
                    {isLoggedin ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}

                </IonList>
            </IonContent>
        </IonMenu>

        <IonRouterOutlet id="my-content"></IonRouterOutlet>
    </>
}