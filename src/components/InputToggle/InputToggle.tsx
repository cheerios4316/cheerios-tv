"use client";

import { FC, useState } from "react";
import styles from "./InputToggle.module.scss";

interface IInputToggleProps {
  name: string;
  value?: boolean;
  inlineLabel?: string;
}

const InputToggle: FC<IInputToggleProps> = ({ name, value, inlineLabel }) => {

  const [isToggled, setToggled] = useState<boolean>(value ?? false);

  return (
    <div className={styles["input-toggle"]}>
      {inlineLabel && (
        <span className={styles["input-toggle__label"]}>{inlineLabel}</span>
      )}
      <div className={styles["input-toggle__toggler"]} onClick={() => setToggled(!isToggled)}>
        <div className={`${styles["input-toggle__toggler__ball"]} ${isToggled ? styles["input-toggle__toggler__ball--active"] : ""}`}></div>
      </div>
      <input type="hidden" name={name} value={isToggled ? "true" : "false"} />
    </div>
  );
};

export { InputToggle, type IInputToggleProps };
