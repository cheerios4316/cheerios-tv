import { FC, ReactNode } from "react";
import styles from "./SettingsSection.module.scss";

interface ISettingsSectionProps {
  title: string;
  children: ReactNode;
}

const SettingsSection: FC<ISettingsSectionProps> = ({ title, children }) => {
  return (
    <div className={styles["settings-section"]}>
      <h3 className={styles["settings-section__title"]}>{title}</h3>
      {children}
    </div>
  );
};

export { SettingsSection, type ISettingsSectionProps };
