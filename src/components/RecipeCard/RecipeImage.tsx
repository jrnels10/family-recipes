import { SocialSharing } from "@ionic-native/social-sharing";
import { IonImg, IonChip, IonIcon, IonLabel, IonFab, IonFabButton, IonFabList } from "@ionic/react";
import { timeOutline, logoFacebook, logoTwitter, logoWhatsapp, camera } from "ionicons/icons";
import SMS from './../../assets/SVG/SMS.svg';
import ShareSvg from './../../assets/SVG/Share.svg';
import { IRecipe } from "../../Data/CTX/types";
import { usePhotoGallery } from "../../Utils/Camera";
import { CookTime } from "./CookTime";


interface IRecipeImage {
    recipe: IRecipe,
    edit: boolean
}

export const RecipeImage = ({ recipe, edit }: IRecipeImage) => {
    return (
        <div className='recipe_card-main-image-container position-relative'>
            {!edit ? <DefaultImage recipe={recipe} /> : <EditImage recipe={recipe} />}
            <CookTime recipe={recipe} edit={edit} />
        </div>
    )
};


const DefaultImage = ({ recipe }: { recipe: IRecipe }) => {
    return (
        <>
            <IonImg className='recipe_card-main-image' src={recipe.photos[0].fileUrl} />
            <ShareComp />
        </>
    )
};

const EditImage = ({ recipe }: { recipe: IRecipe }) => {
    const { photos, takePhoto, setPhotos } = usePhotoGallery();
    return (
        <>
            <IonImg className='recipe_card-main-image--edit' src={recipe.photos[0].fileUrl} />
            <IonFabButton onClick={takePhoto} color='warning' className='new_recipe-picture'>
                <IonIcon icon={camera} />
            </IonFabButton>
        </>
    )
}




const ShareComp = () => {
    const recipeMessage = 'Check out this recipe! \n \n';
    const shareFacebook = async () => {
        const res = await SocialSharing.shareViaFacebook(`${recipeMessage} ${window.location.href}`, '');
        console.log(res)
    }
    const shareTwitter = async () => {
        const res = await SocialSharing.shareViaTwitter(`${recipeMessage} ${window.location.href}`, '');
        console.log(res)
    }
    const shareWhatsapp = async () => {
        const res = await SocialSharing.shareViaWhatsApp(`${recipeMessage} ${window.location.href}`, '');
        console.log(res)
    }
    const shareSMS = async () => {
        const res = await SocialSharing.shareViaSMS(`${recipeMessage} ${window.location.href}`, '');
        console.log(res)
    }
    return (
        <IonFab vertical="bottom" horizontal="start" slot="fixed">
            <IonFabButton size='small'>
                <IonIcon src={ShareSvg} size='small' />
            </IonFabButton>
            <IonFabList side='end'>
                <IonFabButton onClick={shareFacebook}>
                    <IonIcon icon={logoFacebook} />
                </IonFabButton>
                <IonFabButton onClick={shareTwitter}>
                    <IonIcon icon={logoTwitter} />
                </IonFabButton>
                <IonFabButton onClick={shareWhatsapp}>
                    <IonIcon icon={logoWhatsapp} />
                </IonFabButton>
                <IonFabButton onClick={shareSMS}>
                    <IonIcon src={SMS} />
                </IonFabButton>
            </IonFabList>
        </IonFab>
    )
}