/* Using with useIonModal Hook */

import React, { FC, useState } from 'react';
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonToolbar, useIonModal } from '@ionic/react';
import { closeCircleOutline, filterCircle } from 'ionicons/icons';

export const FilterBody: React.FC<{
    count: number;
    onDismiss: () => void;
    onIncrement: () => void;
}> = ({ count, onDismiss, onIncrement }) => (
    <IonContent fullscreen className='ion-padding '>
        <IonToolbar>

        </IonToolbar>
        <IonButton expand="block" onClick={() => onIncrement()}>
            Increment Count
        </IonButton>
        <IonButton expand="block" onClick={() => onDismiss()}>
            Close
        </IonButton>
    </IonContent>
);





export const RecipeIngredients: React.FC<{
    onDismiss: () => void;
}> = ({ onDismiss }) => {
    return (
        <IonContent fullscreen className='ion-padding '>
            <IonToolbar>
                <IonButton onClick={() => onDismiss()}>
                    <IonIcon icon={closeCircleOutline} />
                </IonButton>
            </IonToolbar>
            <IonButton expand='block' onClick={()=>null}>
                Add New Ingredient
            </IonButton>
            
        </IonContent>
    );
}