import {
  IonList,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useRef } from "react";
import "./list.css";

interface IEditList {
  list: string[];
  editItem?: (item: string) => void;
  deleteItem?: (item: string) => void;
}

export const EditList = ({
  list,
  editItem = undefined,
  deleteItem = undefined,
}: IEditList) => {
  const ionListRef: any = useRef();
  const editable = deleteItem !== undefined || editItem !== undefined;
  const itemAction = (action: "edit" | "delete", item: string) => {
    if (editItem && action === "edit") {
      editItem(item);
    }
    if (deleteItem && action === "delete") {
      deleteItem(item);
    }
    ionListRef.current.closeSlidingItems();
  };

  return (
    <IonList inset ref={ionListRef} style={{ marginBottom: 0 }}>
      {list.map((item, index) => (
        <IonItemSliding key={index}>
          {editItem && (
            <IonItemOptions side="start">
              <IonItemOption
                color="success"
                expandable
                onClick={() => itemAction("edit", item)}
              >
                Edit
              </IonItemOption>
            </IonItemOptions>
          )}
          <IonItem detail={editable}>
            <IonLabel color="medium" style={{ fontSize: "12px" }}>
              {item}
            </IonLabel>
          </IonItem>
          {deleteItem && (
            <IonItemOptions side="end">
              <IonItemOption
                color="danger"
                expandable
                onClick={() => itemAction("delete", item)}
              >
                Delete
              </IonItemOption>
            </IonItemOptions>
          )}
        </IonItemSliding>
      ))}
    </IonList>
  );
};
