import { IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonList, IonNote, IonInput, IonItem, IonLabel, IonTextarea, IonButton, IonIcon, IonChip } from "@ionic/react"
import { add, closeCircleOutline } from "ionicons/icons";
import { title } from "process";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { AppContext } from "../../Data/CTX/AppContext";
import { IRecipe } from "../../Data/CTX/types"
import { InputSelect } from "../InputSelect";


export const RecipeCardBody = ({ recipe, edit = false, setUpdate }: { recipe: IRecipe, edit?: boolean, setUpdate?: ({ }) => any }) => {
    return !edit ? <DefaultBody recipe={recipe} /> : <EditBody recipe={recipe} />
};


const DefaultBody = ({ recipe }: { recipe: IRecipe }) => {
    console.log(recipe)
    return (
        <>
            <IonCardHeader>
                <IonCardTitle>{recipe.title}</IonCardTitle>
                <IonCardSubtitle>by {recipe.chef}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                {recipe.description}
            </IonCardContent>
            <IonCardContent>
                <IonCardTitle color='dark' className='mb-1' style={{ fontSize: '1.2em' }}>Ingredients</IonCardTitle>
                <IonList>
                    {recipe.ingredients?.split('\n').map((ingredient, i) => <div key={i}><IonNote >{ingredient}</IonNote><br /></div>)}
                </IonList>
            </IonCardContent>
            <IonCardContent>
                <IonCardTitle color='dark' className='mb-1' style={{ fontSize: '1.2em' }}>Instructions</IonCardTitle>
                {recipe.instructions}
            </IonCardContent>
        </>
    )
};



const EditBody = ({ recipe }: { recipe: IRecipe }) => {
    const { recipeApi, setSaving, updateRecipe } = useContext(AppContext);
    const [title, setTitle] = useState<string>(recipe.title);
    const [chef, setChef] = useState<string>(recipe.chef);
    const [chefList, setChefList] = useState<string[]>([]);
    const [editComp, setEditComp] = useState<string>('');
    const [recipeIngredients, setRecipeIngredients] = useState<string>(recipe.ingredients ? recipe.ingredients : '');
    const [instructions, setInstructions] = useState<string | undefined>(recipe.instructions);
    const [description, setDescription] = useState<string | undefined>(recipe.description);
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
    const update = (setState: any, variable: string, value: string) => {
        setState(value);
        updateRecipe({ [variable]: value });
    };
    return (
        <>
            <IonCardHeader>
                {/* edit title */}
                {editComp !== 'title' ? <IonCardTitle onClick={() => setEditComp('title')}>{title}</IonCardTitle> : <IonItem className='ion-no-padding'>
                    <IonLabel position="floating">Title</IonLabel>
                    <IonInput disabled={false} value={title} placeholder="Name of recipe" onIonChange={e => update(setTitle, 'title', e.detail.value!)} clearInput></IonInput>
                </IonItem>}

                {/* edit chef */}
                {editComp !== 'chef' ? <IonCardSubtitle onClick={() => setEditComp('chef')}>by {chef}</IonCardSubtitle> : <InputSelect label='Chef' value={chef} setValue={val => update(setChef, 'chef', val)} options={chefList} />}

                {/* edit description */}
            </IonCardHeader>
            {editComp !== 'description' ? <IonCardContent onClick={() => setEditComp('description')}>
                {description}
            </IonCardContent> : <IonItem className='ion-no-padding ion-margin'>
                <IonLabel position="floating">Description</IonLabel>
                <IonTextarea disabled={false} value={description} placeholder="Tell us about this recipe" onIonChange={e => update(setDescription, 'description', e.detail.value!)} clearOnEdit></IonTextarea>
            </IonItem>}


            {/* edit ingredients */}
            {editComp !== 'ingredients' ? <IonCardContent onClick={() => setEditComp('ingredients')}>
                <IonCardTitle color='dark' className='mb-1' style={{ fontSize: '1.2em' }}>Ingredients</IonCardTitle>
                <IonList>
                    {recipe.ingredients?.split('\n').map((ingredient, i) => <div key={i}><IonNote >{ingredient}</IonNote><br /></div>)}
                </IonList>
            </IonCardContent> : <Ingredients ingredientList={[...recipeIngredients ? recipeIngredients.split('\n').map(r => r) : []]} setIngredientsList={(arrString: string) => update(setRecipeIngredients, 'ingredients', arrString)} />}



            {/* edit instructions */}
            {editComp !== 'instructions' ? <IonCardContent onClick={() => setEditComp('instructions')}>
                <IonCardTitle color='dark' className='mb-1' style={{ fontSize: '1.2em' }}>Instructions</IonCardTitle>
                {instructions}
            </IonCardContent> :
                <IonItem className='ion-no-padding ion-margin'>
                    <IonLabel position="floating">Instructions</IonLabel>
                    <IonTextarea value={instructions} placeholder="Tell us about this recipe" onIonChange={e => update(setInstructions, 'instructions', e.detail.value!)} clearOnEdit></IonTextarea>
                </IonItem>}
        </>
    )
};




const Ingredients = ({ ingredientList = [], setIngredientsList }: { ingredientList: string[], setIngredientsList: any }) => {
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState<string[]>([...ingredientList]);
    const AddIngredient = () => {
        if (ingredient) {
            setIngredients([...ingredients, ingredient])
            setIngredient('');
            setIngredientsList([...ingredients, ingredient].join('\n'));
        };
    };

    const DeletIngredient = (ingr: string) => {
        const filtered = [...ingredients.filter(i => i !== ingr)];
        setIngredients(filtered);
        setIngredientsList(filtered.join('\n'));
    }

    return <><IonItem className='ion-no-padding ion-margin'>
        <IonLabel position="stacked">Ingredients</IonLabel>
        <div className='row w-100 m-0 p-0'>
            <div style={{ margin: 0, float: 'left', width: 'calc(100% - 45px)' }}>
                <IonInput className='float-left ' style={{ width: '100%' }} value={ingredient} placeholder="Amount, units, ingredient" onIonChange={e => setIngredient(e.detail.value!)} clearInput />
            </div>
            <div style={{ margin: 0, float: 'right', width: '45px' }}>
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
        }</>
}