import { IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonSearchbar } from "@ionic/react"
import { arrowDown } from "ionicons/icons";
import { useState } from "react";
import ChevronDown from './../assets/SVG/chevronDown.svg'

interface iInputSelect {
    value: string;
    label: string;
    loading?: boolean;
    options: any[],
    setValue: (val: string) => void
}

export const InputSelect = ({ value = '', label = '', options = [], loading = false, setValue }: iInputSelect) => {
    const [select, setSelect] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const setInputValue = (value: string) => {
        setValue(value);
        if(!select){
            setDropdown(true);
        }
        setSelect(false);
    }

    const openDropdown = (e: any) => {
        setDropdown(!dropdown);
        e.preventDefault();
        e.stopPropagation();
    }
    const dropdownSelect = (value: string) => {
        setInputValue(value);
        setDropdown(false);
        setSelect(true);
    }
    return (
        <>
            <IonItem className='ion-no-padding input_select' detail={true} detailIcon={ChevronDown} onClick={openDropdown}>
                <IonLabel position="floating">{label}</IonLabel>
                {/* <IonIcon icon={ChevronDown}  className='input_select-dropdown-icon' onClick={openDropdown} /> */}
                <IonInput className='input_select-input' disabled={loading} value={value} placeholder="Name of recipe" onIonChange={e => setInputValue(e.detail.value!)} clearInput>
                </IonInput>

            </IonItem>
            {
                dropdown ? <IonList className='ion-no-padding chef__select__menu-list'>
                    {
                        options.filter(o => o.toLowerCase().includes(value.toLowerCase())).map((f) => (
                            <IonItem key={f} className='ion-no-padding chef__select__menu-item' onClick={() => dropdownSelect(f)}>
                                <IonNote>{f}</IonNote><br />
                            </IonItem>))
                    }
                </IonList> : null
            }
        </>
    )
}