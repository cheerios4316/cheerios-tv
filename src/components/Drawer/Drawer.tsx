"use client";

import {
  FC,
  ReactNode,
  UIEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Drawer.module.scss";
import { X } from "lucide-react";
import { useDrawer } from "./DrawerContext";

interface IDrawerProps {
  children: ReactNode;
  previewIcon: ReactNode;
}

const Drawer: FC<IDrawerProps> = ({ children, previewIcon }) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const { isDrawerOpen, setIsDrawerOpen } = useDrawer();

  const [previewStatus, setPreviewStatus] = useState<"hidden" | "open">(
    "hidden"
  );
  const openDrawer = () => {
    setPreviewStatus("hidden");
    setIsDrawerOpen(true);
  };

  const closeModal = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      const inInterestArea =
        event.clientX > window.innerWidth * 0.8 &&
        event.clientY < window.innerHeight * 0.3;

      if (inInterestArea && !isDrawerOpen) {
        setPreviewStatus("open");
      } else {
        setPreviewStatus("hidden");
      }
    };

    const clickHandler = (event: MouseEvent) => {
      if (
        isDrawerOpen &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", clickHandler);
    document.addEventListener("mousemove", moveHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
      document.removeEventListener("mousemove", moveHandler);
    };
  }, [isDrawerOpen, setIsDrawerOpen]);

  return (
    <div className={styles["container"]}>
      <div
        onClick={openDrawer}
        className={`${styles["preview"]} ${
          styles[`preview--${previewStatus}`]
        }`}
      >
        {previewIcon}
      </div>
      <div
        ref={drawerRef}
        className={`${styles["drawer"]} ${
          styles[`drawer--${isDrawerOpen ? "open" : "hidden"}`]
        }`}
      >
        <div className={styles["drawer__content"]}>
          <div
            className={styles["drawer__content__close-button"]}
            onClick={closeModal}
          >
            <X />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export { Drawer, type IDrawerProps };
