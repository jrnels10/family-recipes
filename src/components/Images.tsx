import { IonCard, IonIcon, IonImg } from "@ionic/react";
import { camera, pizza } from "ionicons/icons";
import { useEffect, useState } from "react";
import { IUserPhoto } from "./../interfaces/UserPhoto";
import { useLongPress } from "./Utils";
import "./images.css";
import { usePhotoGallery } from "../Utils/Camera";

export const BoxedImage = ({ image, alt }: { image: string; alt: string }) => {
  const imageStyle: any = {
    objectFit: "cover",
    height: "150px",
    width: "100%",
  };
  return (
    <IonCard
      style={{
        ...imageStyle,
        margin: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {image ? (
        <IonImg src={image} alt={alt} style={imageStyle} />
      ) : (
        <IonIcon icon={pizza} size="large" />
      )}
    </IonCard>
  );
};

export const CameraCard = ({
  setImage,
}: {
  setImage: (arg0: IUserPhoto) => void;
}) => {
  const { photos, takePhoto } = usePhotoGallery();
  const [hover, setHover] = useState(false);
  const onhold = useLongPress({
    onLongPress: (e) => setHover(true),
    onClick: takePhoto,
  });
  const cardHover = hover && {
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  const imgHover = hover && {
    filter: "blur(2px) opacity(50%)",
  };

  useEffect(() => setImage(photos[0]), [photos]);
  return (
    <IonCard
      style={{
        height: "150px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...cardHover,
      }}
      {...onhold}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {photos.length !== 0 && (
        <IonImg
          src={photos[0].webviewPath}
          style={{
            objectFit: "cover",
            height: "150px",
            width: "100%",
            position: "absolute",
            ...imgHover,
          }}
        />
      )}
      {(photos.length === 0 || hover) && <IonIcon icon={camera} size="large" />}
    </IonCard>
  );
};
