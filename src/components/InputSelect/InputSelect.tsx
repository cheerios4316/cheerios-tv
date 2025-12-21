import { FC, useEffect, useState } from "react";
import styles from "./InputSelect.module.scss";
import { ChevronDown } from "lucide-react";

interface IInputSelectProps {
  name: string;
  title?: string;
  options: {
    value: string;
    label: string;
  }[];
  defaultValue?: string;
}

const InputSelect: FC<IInputSelectProps> = ({
  name,
  options,
  defaultValue,
  title,
}) => {
  const valueList = options.map((elem) => elem.value);

  const prefill = valueList.includes(defaultValue ?? "") ? defaultValue : null;

  const [inputValue, setInputValue] = useState<string | null>(prefill ?? null);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const toggleOptions = () => setShowOptions(!showOptions);

  return (
    <div className={styles["input-select"]}>
      <div className={styles["input-select__select"]}>
        <div
          className={styles["input-select__select__current"]}
          onClick={toggleOptions}
        >
          <span className={styles["input-select__select__current__label"]}>
            {title}
          </span>
          <span>{inputValue ?? "-- select --"}</span>
          <ChevronDown className={showOptions ? styles["rotated"] : ""} />
        </div>
        <div
          className={`${styles["input-select__select__options"]} ${
            showOptions ? styles["input-select__select__options--active"] : ""
          }`}
        >
          {options.map((elem) => (
            <div
              key={`${name}_${elem.value}`}
              className={styles["input-select__select__options__option"]}
              data-value={elem.value}
              onClick={(event) => {
                const value = (event.currentTarget as HTMLDivElement).dataset
                  .value;
                if (value !== undefined) {
                  setInputValue(value);
                  setShowOptions(false);
                }
              }}
            >
              {elem.label}
            </div>
          ))}
        </div>
      </div>
      <input type="hidden" name={name} value={inputValue ?? ""} />
    </div>
  );
};

export { InputSelect, type IInputSelectProps };
