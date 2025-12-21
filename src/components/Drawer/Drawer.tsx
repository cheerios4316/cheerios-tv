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

interface IDrawerProps {
  children: ReactNode;
  previewIcon: ReactNode;
}

const Drawer: FC<IDrawerProps> = ({ children, previewIcon }) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  const [previewStatus, setPreviewStatus] = useState<"hidden" | "open">(
    "hidden"
  );
  const [drawerStatus, setDrawerStatus] = useState<"hidden" | "open">("hidden");

  const openDrawer = () => {
    setPreviewStatus("hidden");
    setDrawerStatus("open");
  };

  const closeModal = () => {
    setDrawerStatus("hidden");
  };

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      const inInterestArea =
        event.clientX > window.innerWidth * 0.8 &&
        event.clientY < window.innerHeight * 0.3;

      if (inInterestArea && drawerStatus === "hidden") {
        setPreviewStatus("open");
      } else {
        setPreviewStatus("hidden");
      }
    };

    const clickHandler = (event: MouseEvent) => {
      if (
        drawerStatus === "open" &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setDrawerStatus("hidden");
      }
    };

    document.addEventListener("mousedown", clickHandler);
    document.addEventListener("mousemove", moveHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
      document.removeEventListener("mousemove", moveHandler);
    };
  }, [drawerStatus]);

  const handleScroll: UIEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;

    const visiblePercent = el.clientHeight / el.scrollHeight;

    const belowPercent =
      (el.scrollHeight - el.clientHeight - el.scrollTop) / el.scrollHeight;

    console.log({ visiblePercent, belowPercent });
  };

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
        className={`${styles["drawer"]} ${styles[`drawer--${drawerStatus}`]}`}
      >
        <div className={styles["drawer__content"]} onScroll={handleScroll}>
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
