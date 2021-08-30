import React, { useContext } from 'react';
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonRouterOutlet, IonMenuToggle, IonIcon, IonLabel, IonListHeader, IonToggle } from '@ionic/react';
import { calendarOutline, hammer, moonOutline, help, informationCircleOutline, logIn, logOut, mapOutline, peopleOutline, person, personAdd } from 'ionicons/icons';
import { RouteComponentProps, withRouter, useLocation } from 'react-router';
import { AppContext } from '../Data/CTX/AppContext';

const routes = {
    appPages: [
        { title: 'Recipes', path: '/tab/recipes', icon: calendarOutline },
        // { title: 'New Recipe', path: '/tabs/new-recipe', icon: peopleOutline },
        { title: 'Map', path: '/tabs/map', icon: mapOutline },
        { title: 'About', path: '/tabs/about', icon: informationCircleOutline }
    ],
    loggedInPages: [
        { title: 'Account', path: '/account', icon: person },
        { title: 'Support', path: '/support', icon: help },
        { title: 'Logout', path: '/logout', icon: logOut }
    ],
    loggedOutPages: [
        { title: 'Login', path: '/login', icon: logIn },
        { title: 'Support', path: '/support', icon: help },
        { title: 'Signup', path: '/signup', icon: personAdd }
    ]
};

interface Pages {
    title: string,
    path: string,
    icon: string,
    routerDirection?: string
};

export const MenuNavigator: React.FC = () => {
    const { user: { isLoggedin } } = useContext(AppContext);
    const location = useLocation();
    function renderlistItems(list: Pages[]) {
        return list
            .filter(route => !!route.path)
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