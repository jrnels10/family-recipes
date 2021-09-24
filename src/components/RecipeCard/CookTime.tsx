import { pickerController } from '@ionic/core';
import { IonChip, IonIcon, IonLabel } from '@ionic/react';
import { timeOutline } from 'ionicons/icons';
import { useState } from 'react';
import { IRecipe } from '../../Data/CTX/types';




const defaultColumnOptions = [
    [
        'sample'
    ]
]

const multiColumnOptions = [
    [...addTime(' hour')],
    [...addTime(' minute')]
]
function addTime(units: string) {
    let count = 0;
    const time = units === 'hour' ? 24 : 60;
    const timeArray = [];
    while (count <= time) {
        timeArray.push(count.toString().concat(`${units}${count > 1 ? "s" : ''}`))
        count++
    }
    return timeArray;
}

function getColumnOptions(columnIndex: string | number, numOptions: number, columnOptions: { [x: string]: any[]; }) {
    let options = [];
    for (let i = 0; i < numOptions; i++) {
        options.push({
            text: columnOptions[columnIndex][i % numOptions],
            value: i
        })
    }

    return options;
}

function getColumns(this: any, numColumns: number, numOptions: any, columnOptions: any) {
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
        columns.push({
            name: `${i === 0 ? 'hours' : 'minutes'}`,
            options: getColumnOptions(i, i === 0 ? 24 : 60, columnOptions)
        });
    }

    return columns;
}

async function openPicker(this: any, numColumns = 1, numOptions = 5, columnOptions = defaultColumnOptions, setCookTime: any) {
    const picker = await pickerController.create({
        columns: getColumns(numColumns, numOptions, columnOptions),
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel'
            },
            {
                text: 'Confirm',
                handler: (value) => {
                    console.log(`Got Value ${value}`);
                }
            }
        ]
    });

    await picker.present();
    const selection = await picker.onDidDismiss();
    if (selection.role !== 'cancel') {
        const { data: { hours, minutes } } = selection;
        setCookTime([hours.value, minutes.value]);
    }
}






export const CookTime = ({ recipe, edit }: { recipe: IRecipe, edit: boolean }) => {
    const [cookTime, setCookTime] = useState(recipe.cookTime?recipe.cookTime.split('\n'):['0','0']);

    return recipe.cookTime || edit? (
        <IonChip
            color={edit ? 'success' : 'light'}
            className='recipe_card-main-image-info--cookTime'
            onClick={() => edit ? openPicker(2, 60, multiColumnOptions, setCookTime) : null}
        >
            <IonIcon color="dark" icon={timeOutline} />
            <IonLabel color="dark">
                {`${cookTime[0]}h ${cookTime[1]}m`}
            </IonLabel>
        </IonChip >
    ) : null
}