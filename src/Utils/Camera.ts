import { Camera, CameraResultType, CameraSource, Photo } from "@capacitor/camera";
import moment from "moment";
import {decode} from "base64-arraybuffer";
import { useCallback, useRef, useState } from "react";
import { IUserPhoto } from "../interfaces/UserPhoto";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";

  
export function usePhotoGallery() {
    const [photos, setPhotos] = useState<any[]>([]);
    //   const takePhoto = async () => {
    //       const cameraPhoto = await Camera.getPhoto({
    //           resultType: CameraResultType.Base64,
    //           source: CameraSource.Camera,
    //           quality: 100,
    //       });
    //       console.log(cameraPhoto)
    //       if (cameraPhoto.base64String) {
              
    //           const blob = new Blob([new Uint8Array(decode(cameraPhoto.base64String))], {
    //               type: `image/${cameraPhoto.format}`,
    //             });
                
    //             const file = new File([blob], "Name", {
    //                 lastModified: moment().unix(),
    //                 type: blob.type,
    //             });
    //             const newPhotos = [
    //                 file,
    //                 ...photos,
    //             ];
    //           console.log(newPhotos)
    //             setPhotos(newPhotos);
                
    //         }
    //     }
        
  
    // return {
    //   photos,
    //   takePhoto,
    // };
    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: CameraSource.Camera,
          quality: 100,
        });
        const savedImageFile = await savePicture(photo);
        const newPhotos = [
            savedImageFile,
          ...photos,
        ];

        // console.log(photo.path)
        setPhotos(newPhotos);
      };
    
      return {
        photos,
        takePhoto,
      };
}

const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
      resolve(reader.result);
  };
  reader.readAsDataURL(blob);
});

async function readAsBase64(photo: Photo) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(photo.webPath!);
    const blob = await response.blob();
  
    return await convertBlobToBase64(blob) as string;
  }
  

export async function savePicture(photo: Photo) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await readAsBase64(photo);
  
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
  
    // Use webPath to display the new image instead of base64 since it's
    // already loaded into memory
    return {
      filepath: fileName,
      webviewPath: photo.webPath
    };
}
  

const readSecretFile = async () => {
    const contents = await Filesystem.readFile({
      path: 'secrets/text.txt',
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
  
    console.log('secrets:', contents);
};
  
const readFilePath = async () => {
    // Here's an example of reading a file with a full file path. Use this to
    // read binary data (base64 encoded) from plugins that return File URIs, such as
    // the Camera.
    const contents = await Filesystem.readFile({
      path: 'file:///var/mobile/Containers/Data/Application/22A433FD-D82D-4989-8BE6-9FC49DEA20BB/Documents/text.txt'
    });
  
    console.log('data:', contents);
  };