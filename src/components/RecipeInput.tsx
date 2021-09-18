import React, { useContext, useEffect, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonItem, IonLabel, IonList, IonItemDivider, IonGrid, IonRow, IonTextarea, IonCol, IonFab, IonFabButton, IonIcon, IonSelect, IonSelectOption, IonButton, IonToast, IonImg, IonChip, IonSpinner, IonBackdrop, IonToggle, IonSegment, IonSegmentButton, IonButtons, IonNote, IonSearchbar } from '@ionic/react';
import { ICookTime, IRecipe } from '../Data/CTX/types';
import { AppContext } from '../Data/CTX/AppContext';
import { useHistory } from 'react-router';
import { usePhotoGallery } from '../Utils/Camera';
import { add, addCircle, alertOutline, camera, closeCircleOutline, helpCircleOutline, peopleCircleOutline, peopleOutline, shieldCheckmark, shieldOutline, trashBinOutline } from 'ionicons/icons';
import './recipeInput.scss';
import { pickerController } from '@ionic/core';
import { InputSelect } from './InputSelect';




const defaultColumnOptions = [
    [
        'Dog',
        'Cat',
        'Bird',
        'Lizard',
        'Chinchilla'
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




export const RecipeInput: React.FC = () => {
    const { photos, takePhoto, setPhotos } = usePhotoGallery();
    const { recipeApi, setSaving, addRecipe, resetRecipe } = useContext(AppContext);
    const [description, setDescription] = useState<string>('');
    const [instructions, setInstructions] = useState<string>('');
    const [chef, setChef] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [privacy, setPrivacy] = useState<string>('private');
    const [ingredient, setIngredient] = useState<string>('');
    const [ingredients, setIngredients] = useState<string[]>([]);
    const [chefList, setChefList] = useState<string[]>([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [submitRes, setSubmitRes] = useState('');
    const [cookTime, setCookTime] = useState(['0h', '0m']);

    const history = useHistory();
    const AddIngredient = () => {
        if (ingredient) {
            setIngredients([...ingredients, ingredient])
            setIngredient('');
        };
    };

    const DeletIngredient = (ingr: string) => {
        setIngredients([...ingredients.filter(i => i !== ingr)]);
    }

    const submitRecipe = async (e: React.FormEvent) => {
        setLoading(true);
        setSaving(true);
        e.preventDefault();
        if (title && chef) {
            const recipe: IRecipe = {
                title,
                chef,
                description,
                privacy: privacy === 'public' ? false : true,
                photos,
                cookTime: `${cookTime[0]}\n${cookTime[1]}`,
                ingredients: ingredients.join('\n'),
                instructions
            };
            const res = await recipeApi.createNewRecipe(recipe);
            if (res.status === 201 && recipe.photos.length) {
                const imgUrl = await recipeApi.uploadImage(res.data.id, recipe.photos[0].blobData, 'test', 'jpeg');
                debugger
                recipe.photos[0] = imgUrl.data.fileUrl;
                addRecipe(recipe);
                setSubmitRes('New Recipe has been created!')
            } else if (res.status === 201) {
                addRecipe(recipe);
                setSubmitRes('New Recipe has been created!')
            } else {
                setSubmitRes('error in creating new recipe')
            }
        } else {
            setSubmitRes('title and chef are required fields')
        }
        setSaving(false);
        setLoading(false);
        setFormSubmitted(true);
    };

    const submitAction = async () => {
        setFormSubmitted(false);
        resetRecipe();
        history.push({
            pathname: '/recipe/new',
            state: {
                from: history.location.pathname
            }
        })
    };

    const changePrivacy = (value: string) => {
        setPrivacy(value)
    }
    const getChefs = async () => {
        const res = await recipeApi.getChefs();
        if (res.status === 200) {
            setChefList([...res.data.map((c: { chef: string; }) => c.chef)])
        }
        return res.data
    }
    useEffect(() => {
        getChefs()
    }, []);


    console.log(chefList)
    return (
        <IonContent>
            {loading ? <IonSpinner className='spin' name="crescent" /> : null}
            <IonToast
                position='top'
                color={submitRes === 'New Recipe has been created!' ? 'success' : 'danger'}
                isOpen={formSubmitted}
                onDidDismiss={submitAction}
                message={submitRes}
                duration={1000}
            />
            <IonFabButton onClick={takePhoto} color='warning' className='new_recipe-picture'>
                <IonIcon icon={camera} />
            </IonFabButton>
            <IonGrid>
                <IonRow>
                    {photos.map((photo, index) => (
                        <IonCol size="12" key={index} className='recipe-image-container'>
                            <IonImg src={'data:image/jpeg;base64,' + photo.fileUrl} />
                            <IonFabButton color="danger" onClick={() => setPhotos([])}>
                                <IonIcon icon={trashBinOutline} />
                            </IonFabButton>
                        </IonCol>
                    ))}
                </IonRow>
            </IonGrid>
            <form noValidate onSubmit={submitRecipe}>
                <IonGrid className="ion-padding">
                    <IonRow>
                        <IonSegment value={privacy} onIonChange={e => changePrivacy(e.detail.value!)} color={privacy === 'private' ? 'primary' : 'secondary'}>
                            <IonSegmentButton value='private'>
                                <IonIcon icon={peopleCircleOutline} color='secondary' />
                                <IonLabel color='secondary'>
                                    Private
                                </IonLabel>
                            </IonSegmentButton>
                            <IonSegmentButton value='public' >
                                <IonIcon icon={peopleOutline} color='primary' />
                                <IonLabel color='primary'>
                                    Public
                                </IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </IonRow>
                    <IonList>
                        <IonItem className='ion-no-padding'>
                            <IonLabel position="floating">Title</IonLabel>
                            <IonInput disabled={loading} value={title} placeholder="Name of recipe" onIonChange={e => setTitle(e.detail.value!)} clearInput></IonInput>
                        </IonItem>
                        <InputSelect label='Chef' value={chef} setValue={setChef} options={chefList}/>
                        {/* <IonItem className='ion-no-padding'>
                            <IonLabel position="floating">Chef</IonLabel>
                            <IonInput disabled={loading} value={chef} placeholder="Name of recipe" onIonChange={e => setChef(e.detail.value!)} clearInput></IonInput>
                        </IonItem>
                       {chef?.length?<div className='chef__select__menu-list'>
                           <div>test</div>
                           <div>test</div>
                           <div>test</div>
                           <div>test</div>
                       </div>:null} */}
                        <IonItem className='ion-no-padding'>
                            <IonLabel position="floating">Description</IonLabel>
                            <IonTextarea disabled={loading} value={description} placeholder="Tell us about this recipe" onIonChange={e => setDescription(e.detail.value!)} clearOnEdit></IonTextarea>
                        </IonItem>
                        <IonItem className='ion-no-padding '>
                            <IonLabel position="floating">Ingredients</IonLabel>
                            <div className='row w-100 m-0 p-0'>
                                <div className='col-10 ' style={{ margin: 0, float: 'left' }}>
                                    <IonInput className='float-left ' disabled={loading} value={ingredient} placeholder="Amount, units, ingredient" onIonChange={e => setIngredient(e.detail.value!)} clearInput />
                                </div>
                                <div className='col-2' style={{ margin: 0, float: 'right' }}>
                                    {ingredient.length ? <IonButton className='mb-0' onClick={() => AddIngredient()}>
                                        <IonIcon className='float-left' color='light' icon={add} />
                                    </IonButton> : null}
                                </div>
                            </div>
                        </IonItem>
                        {
                            ingredients.map((ingr, i) => <IonChip key={i} className='border-bottom'>
                                <IonLabel className='w-100' >
                                    {ingr}
                                </IonLabel>
                                <IonIcon color='danger' style={{ margin: 0, float: 'right' }} icon={closeCircleOutline} onClick={() => DeletIngredient(ingr)} />
                            </IonChip>)
                        }
                        <IonItem className='ion-no-padding'>
                            <IonLabel position="floating">Instructions</IonLabel>
                            <IonTextarea disabled={loading} value={instructions} placeholder="Tell us about this recipe" onIonChange={e => setInstructions(e.detail.value!)} clearOnEdit></IonTextarea>
                        </IonItem>
                        <IonButton type='button' expand="block" onClick={() => openPicker(2, 60, multiColumnOptions, setCookTime)}>
                            Cook time
                        </IonButton>
                        {/* <AppModal component={RecipeIngredients}>
                            <IonLabel>Ingredients</IonLabel>
                        </AppModal> */}

                        <IonButton className='ion-margin-top' type='submit' expand='block' >Submit</IonButton>

                    </IonList>
                </IonGrid>
            </form>

        </IonContent>
    );
};