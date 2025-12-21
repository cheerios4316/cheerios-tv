"use client";

import { FC, FormEvent, useEffect, useRef, useState } from "react";
import styles from "./SettingsForm.module.scss";
import { ISettings } from "@/interface";
import { InputText } from "../InputText/InputText";
import { SettingsSection } from "../SettingsSection/SettingsSection";
import { InputToggle } from "../InputToggle/InputToggle";
import { InputArray } from "../InputArray/InputArray";
import { mapper } from "@/helpers/mapper";
import { setCookie } from "@/actions/set-cookie";
import { InputSelect } from "../InputSelect/InputSelect";

interface ISettingsFormProps {
  config: ISettings | null;
}

const SettingsForm: FC<ISettingsFormProps> = ({ config }) => {
  const ref = useRef<HTMLFormElement>(null);

  const [links, setLinks] = useState(config?.links ?? []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!ref.current) return;

    const formData = new FormData(ref.current);

    const newSettings = mapper.settings(formData);

    console.log(formData.get("weather-position"));

    setCookie("settings", JSON.stringify(newSettings));
  };

  useEffect(() => {
    (window as any).getSettings = () => {
      console.log(config);
    };

    (window as any).setSettings = (json: string) =>
      setCookie("settings", JSON.stringify(json));
    return () => {
      delete (window as any).setSettingsJson;
    };
  }, []);

  return (
    <div className={styles["settings-form"]}>
      <div className={styles["settings-form__content"]}>
        <h2 className={styles["settings-form__content__title"]}>Settings</h2>
        <form
          ref={ref}
          className={styles["settings-form__content__form"]}
          onSubmit={onSubmit}
        >
          <SettingsSection title="Search endpoint">
            <InputText
              inlineLabel="URL/path"
              name="search-endpoint"
              placeholder="Search endpoint"
              value={config?.searchEndpoint}
            />
          </SettingsSection>
          <SettingsSection title="Background image">
            <InputText
              inlineLabel="URL/path"
              name="background-image"
              placeholder="Background image URL"
              value={config?.backgroundImage}
            />
          </SettingsSection>
          <SettingsSection title="Weather">
            <InputToggle
              inlineLabel="Enable weather"
              name="weather-enable"
              value={config?.weather?.enable}
            />
            <InputText
              inlineLabel="Latitude"
              name="weather-latitude"
              placeholder="Latitude"
              value={config?.weather?.latitude?.toString()}
            />
            <InputText
              inlineLabel="Longitude"
              name="weather-longitude"
              placeholder="Longitude"
              value={config?.weather?.longitude?.toString()}
            />
            <InputSelect
              title="Position"
              name="weather-position"
              options={[
                {
                  value: "top-left",
                  label: "Top left",
                },
                {
                  value: "top-right",
                  label: "Top right",
                },
                {
                  value: "bottom-left",
                  label: "Bottom left",
                },
                {
                  value: "bottom-right",
                  label: "Bottom right",
                },
              ]}
              defaultValue={config?.weather?.position}
            />
          </SettingsSection>
          <SettingsSection title="Links">
            <InputArray
              name="links"
              items={links}
              fields={["image", "anchor", "url"]}
              onChange={setLinks}
            />
          </SettingsSection>
        </form>
      </div>
      <div className={styles["settings-form__actions"]}>
        <button
          className={styles["settings-form__actions__save-button"]}
          onClick={() => ref.current?.requestSubmit()}
          type="button"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export { SettingsForm, type ISettingsFormProps };
