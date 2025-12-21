"use client";

import { FC, useRef } from "react";
import styles from "./InputText.module.scss";
import { Trash } from "lucide-react";

interface IInputTextProps {
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  hasClearIcon?: boolean;
  inlineLabel?: string;
}

const InputText: FC<IInputTextProps> = ({
  inlineLabel,
  name,
  value,
  placeholder,
  onChange,
  hasClearIcon = true,
}) => {

  const ref = useRef<HTMLInputElement>(null);

  const resetField = () => {
    if (ref.current) {
      ref.current.value = "";
      onChange?.("");
    }
  };

  return (
    <div className={styles["container"]}>
      {}{inlineLabel && <span className={styles["container__label"]}>{inlineLabel}</span>}
      <input
        ref={ref}
        className={styles["input-text"]}
        name={name}
        defaultValue={value}
        placeholder={placeholder}
        onChange={(e) => onChange?.(e.target.value)}
      />
      { hasClearIcon && <Trash onClick={resetField} size={14} />}
    </div>
  );
};

export { InputText, type IInputTextProps };
