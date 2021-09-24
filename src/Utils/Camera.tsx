import { useState, useEffect } from "react";
import { isPlatform } from "@ionic/react";

import {
    Camera,
    CameraResultType,
    CameraSource,
    Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
import { Capacitor } from "@capacitor/core";
import { camera } from "ionicons/icons";
import { IRecipeImage } from "../Data/CTX/types";

function b64toBlob(b64Data: any, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}


export function usePhotoGallery() {
    const [photos, setPhotos] = useState<IRecipeImage[]>([]);
    const takePhoto = async () => {
        try {

            const cameraPhoto = await Camera.getPhoto({
                resultType: CameraResultType.Base64,
                source: CameraSource.Camera,
                quality: 100,
            })

            const blobData = b64toBlob(cameraPhoto.base64String, `image/${cameraPhoto.format}`);
            const fileName = new Date().getTime() + ".jpeg";
            const newPhotos = [
                {
                    fileName,
                    format: cameraPhoto.format,
                    blobData,
                    fileUrl: cameraPhoto.base64String
                },
                ...photos,
            ];
            setPhotos(newPhotos);
        } catch (error) {
console.log(error)
        }
    };

    return {
        photos,
        takePhoto,
        setPhotos
    };
}