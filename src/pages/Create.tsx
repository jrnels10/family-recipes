import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonCard,
  IonSkeletonText,
  IonThumbnail,
  IonIcon,
  IonInput,
  IonItem,
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonTextarea,
  IonFooter,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useState, useEffect, useRef, useContext } from "react";
import { Duration } from "../components/Duration";
import { EditList } from "../components/EditList";
import { CameraCard } from "../components/Images";
import { AppContext } from "../context/Context";
import "./Form.css";

export const Create = () => {
  const { createRecipe } = useContext(AppContext);
  const [image, setImage] = useState<any>(null);
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [ingredient, setIngredient] = useState<string | null>(null);
  const [ingredientList, setIngredientList] = useState<string[]>([]);
  const [duration, setDuration] = useState<string | null>(null);
  const ingredientRef: any = useRef();

  const addIngredientToList = () => {
    if (ingredient) {
      setIngredientList([...ingredientList, ingredient]);
      setIngredient(null);
      ingredientRef?.current?.setFocus();
    }
  };

  const editIngredient = (item: string) => {
    setIngredient(item);
    deleteIngredient(item);
    ingredientRef?.current?.setFocus();
  };

  const deleteIngredient = (item: string) => {
    setIngredientList([...ingredientList.filter((ing) => ing !== item)]);
  };
  const requiredFields =
    title !== "" && ingredientList.length > 0 && duration !== null;

  const submitRecipe = () => {
    if (requiredFields && duration) {
      const recipe = {
        title,
        ingredientList,
        duration,
      };
      createRecipe(recipe);
    }
  };

  return (
    <IonPage style={{ overFlow: "auto" }}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <CameraCard setImage={setImage} />
        <IonItemGroup class="ion-padding">
          <IonItem lines="full">
            <IonLabel position="floating" color="primary">
              Title
            </IonLabel>
            <IonInput
              value={title}
              color="dark"
              placeholder="Enter Recipe Title"
              onIonChange={(e) => setTitle(e.detail.value!)}
              clearInput
            ></IonInput>
          </IonItem>
          <IonItem lines="full">
            <IonLabel position="floating" color="primary">
              Ingredients
            </IonLabel>
            <IonInput
              ref={ingredientRef}
              color="dark"
              value={ingredient}
              placeholder="Enter Recipe Ingredient"
              onIonChange={(e) => setIngredient(e.detail.value!)}
              clearInput
            ></IonInput>
            {ingredient && ingredient.length > 0 && (
              <IonButton
                slot="end"
                fill="clear"
                onClick={addIngredientToList}
                style={{
                  height: "97%",
                  margin: "0",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <IonIcon
                  icon={add}
                  size="large"
                  color="primary"
                  style={{ marginTop: "auto" }}
                />
              </IonButton>
            )}
          </IonItem>
          {ingredientList.length > 0 && (
            <EditList
              list={ingredientList}
              editItem={editIngredient}
              deleteItem={deleteIngredient}
            />
          )}
          <Duration duration={duration} setDuration={setDuration} />
          <IonItem lines="full">
            <IonLabel position="floating" color="primary" style={{}}>
              Description
            </IonLabel>
            <IonTextarea
              autoGrow
              spellcheck
              color="dark"
              style={{ height: "36px" }}
              placeholder="Enter more information here..."
              value={text}
              onIonChange={(e) => setText(e.detail.value!)}
            ></IonTextarea>
          </IonItem>
        </IonItemGroup>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton
            expand="block"
            disabled={!requiredFields}
            style={{ margin: "20px" }}
            onClick={submitRecipe}
          >
            <IonLabel color="white" style={{ marginRight: "5px" }}>
              Create
            </IonLabel>
            <IonIcon icon={add} size="large" color="white" />
          </IonButton>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};
