import {
  useIonPicker,
  IonInput,
  IonItem,
  IonLabel,
  PickerColumnOption,
} from "@ionic/react";
import { useState } from "react";

export const Duration = ({
  duration = null,
  setDuration,
}: {
  duration?: null | string;
  setDuration: (value: null | string) => void;
}) => {
  const [present] = useIonPicker();
  const [value, setValue] = useState<null | string>(duration);

  const buildHours = () => {
    let hour = 0;
    const hourComp: PickerColumnOption[] = [];
    while (hour < 101) {
      hourComp.push({ text: `${hour} hours`, value: hour });
      ++hour;
    }
    return hourComp;
  };

  const buildMinutes = () => {
    let minute = 0;
    const minuteComp: PickerColumnOption[] = [];
    while (minute < 61) {
      minuteComp.push({ text: `${minute} minutes`, value: minute });
      ++minute;
    }
    return minuteComp;
  };

  const buildTime = () => {
    if (value) {
      const timeArray = value?.split(",");
      const hours =
        timeArray![0] === "0"
          ? ""
          : timeArray![0].concat(` hour${timeArray![0] !== "1" ? "s" : ""},`);
      const minutes = timeArray![1].concat(
        ` minute${timeArray![1] !== "1" ? "s" : ""}`
      );
      return `${hours} ${minutes}`;
    }
  };

  const onInputChange = (e: any) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      setDuration(null);
      setValue(null);
    }
  };

  const onDurationSet = (selected: {
    hour: { value: string };
    minute: { value: string };
  }) => {
    setDuration(`${selected.hour.value}, ${selected.minute.value}`);
    setValue(`${selected.hour.value}, ${selected.minute.value}`);
  };
  return (
    <IonItem lines="full">
      <IonLabel position="floating" color="primary">
        Duration
      </IonLabel>
      <IonInput
        value={buildTime()}
        color="dark"
        placeholder="Enter cooking duration"
        onIonChange={onInputChange}
        onFocus={() =>
          present(
            [
              {
                name: "hour",
                options: buildHours(),
              },
              {
                name: "minute",
                options: buildMinutes(),
              },
            ],
            [
              {
                text: "Cancel",
                role: "cancel",
              },
              {
                text: "Confirm",
                handler: onDurationSet,
              },
            ]
          )
        }
        clearInput
      ></IonInput>
    </IonItem>
  );
};
