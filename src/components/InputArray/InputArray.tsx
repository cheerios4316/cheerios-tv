import { FC } from "react";
import styles from "./InputArray.module.scss";
import { IFormField } from "@/interface/form";
import { InputText } from "../InputText/InputText";
import { ILink } from "@/interface";
import { uppercaseFirst } from "@/helpers/utils";
import { PlusCircle, Trash, Trash2 } from "lucide-react";

type StringKeys<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type IInputArrayProps<T> = {
  items: T[];
  fields: StringKeys<T>[];
  onChange: (items: T[]) => void;
  name: string;
};

const InputArray = <T,>({ name, items, fields, onChange }: IInputArrayProps<T>) => {
  const update = <K extends StringKeys<T>>(
    index: number,
    field: K,
    value: string
  ) => {
    const next = [...items];
    next[index] = { ...next[index], [field]: value };
    onChange(next);
  };

  const add = () => {
    const empty = Object.fromEntries(fields.map((field) => [field, ""])) as T;

    onChange([...items, empty]);
  };

  const remove = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className={styles["input-array"]}>
      {items.map((item, index) => (
        <div key={index} className={styles["input-array__element"]}>
          <span className={styles["input-array__element__fields__number"]}>
            {index + 1}
          </span>

          <div className={styles["input-array__element__fields"]}>
            {fields.map((field) => (
              <div
                key={`${index}-${String(field)}`}
                className={styles["input-array__element__field"]}
              >
                <InputText
                  name={`${name}_${field.toString()}_${index}`}
                  inlineLabel={uppercaseFirst(field.toString())}
                  value={item[field] as string}
                  onChange={(value) => update(index, field, value)}
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => remove(index)}
            className={styles["input-array__remove"]}
          >
            <Trash strokeWidth={1} />
          </button>
        </div>
      ))}

      <div className="w-full flex justify-center">
        <button
          type="button"
          onClick={add}
          className={styles["input-array__add"]}
          style={{ textAlign: "center" }}
        >
          <PlusCircle strokeWidth={1} />
        </button>
      </div>
    </div>
  );
};

export { InputArray, type IInputArrayProps };
