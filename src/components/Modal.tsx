/* Using with useIonModal Hook */

import React, { FC, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonToolbar, useIonModal } from '@ionic/react';
import { filterCircle } from 'ionicons/icons';
import { FilterBody } from './RecipeFilter';


export const Modal: React.FC = () => {
    const [count, setCount] = useState(0);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDismiss = () => {
        dismiss();
    };

    /**
     * First parameter is the component to show, second is the props to pass
     */
    const [present, dismiss] = useIonModal(FilterBody, {
        count,
        onDismiss: handleDismiss,
        onIncrement: handleIncrement,
    });
    return (
        <IonButton onClick={() => {
            present({
                cssClass: 'my-class',
            });
        }}>
            <IonIcon icon={filterCircle} />
        </IonButton>
    );
};



export const AppModal = ({ children, component }: { children: any , component:any}) => {

    // const [count, setCount] = useState(0);

    // const handleIncrement = () => {
    //     setCount(count + 1);
    // };

    const handleDismiss = () => {
        dismiss();
    };

    /**
     * First parameter is the component to show, second is the props to pass
     */
    const [present, dismiss] = useIonModal(component, {
        // count,
        onDismiss: handleDismiss,
        // onIncrement: handleIncrement,
    });
    return (
        <IonButton onClick={() => {
            present({
                cssClass: 'my-class',
            });
        }}>
            {children}
        </IonButton>
    );
}