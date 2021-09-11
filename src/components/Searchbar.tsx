import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSearchbar, IonFooter } from '@ionic/react';

interface ISearchBar {
    placeholder?: string;
    searchInput: (text: string) => any;
}

export const Searchbar: React.FC<ISearchBar> = ({ placeholder = '', searchInput }: ISearchBar) => {
    const [searchText, setSearchText] = useState('');

    const setSearchInput = (val: string) => {
        setSearchText(val);
        searchInput(val);
    }
    return (
        <IonSearchbar value={searchText} onIonChange={e => setSearchInput(e.detail.value!)} placeholder={placeholder}></IonSearchbar>
    );
};