"use client";

import {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useContext,
  useRef,
  useState,
} from "react";
import { useDrawer } from "../Drawer/DrawerContext";
import styles from "./ClickHold.module.scss";

interface IClickHoldPosition {
  x: number;
  y: number;
}

const ClickHoldPositionContext = createContext<IClickHoldPosition | null>(null);

const useClickHoldPosition = () => useContext(ClickHoldPositionContext);

interface IClickHoldProps {
  children: ReactNode;
  closeEvent?: string;
  closeSelector?: string;
  holdDuration?: number;
  toggle?: boolean;
}

const ClickHoldContent: FC<IClickHoldProps> = ({
  children,
  closeEvent = "click-hold:close",
  closeSelector = "[data-click-hold-close]",
  holdDuration = 200,
  toggle = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pointerPosition, setPointerPosition] =
    useState<IClickHoldPosition | null>(null);
  const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const clearHoldTimer = () => {
      if (holdTimerRef.current !== null) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
    };

    const showContent = (event: MouseEvent) => {
      if (event.button === 0 && !(toggle && isVisible)) {
        clearHoldTimer();
        setPointerPosition({ x: event.clientX, y: event.clientY });
        holdTimerRef.current = setTimeout(() => {
          setIsVisible(true);
          holdTimerRef.current = null;
        }, Math.max(0, holdDuration));
      }
    };

    const endHold = () => {
      clearHoldTimer();

      if (!toggle) {
        setIsVisible(false);
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        endHold();
      }
    };

    const close = () => setIsVisible(false);
    const handleCloseClick = (event: MouseEvent) => {
      if (
        event.target instanceof Element &&
        event.target.closest(closeSelector)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", showContent);
    document.addEventListener("mouseup", endHold);
    document.addEventListener("dragend", endHold);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("click", handleCloseClick);
    window.addEventListener(closeEvent, close);
    window.addEventListener("blur", endHold);

    return () => {
      clearHoldTimer();
      document.removeEventListener("mousedown", showContent);
      document.removeEventListener("mouseup", endHold);
      document.removeEventListener("dragend", endHold);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("click", handleCloseClick);
      window.removeEventListener(closeEvent, close);
      window.removeEventListener("blur", endHold);
    };
  }, [closeEvent, closeSelector, holdDuration, isVisible, toggle]);

  if (!isVisible) {
    return null;
  }

  return (
    <ClickHoldPositionContext value={pointerPosition}>
      <div className={styles["click-hold"]}>{children}</div>
    </ClickHoldPositionContext>
  );
};

/**
 * Reveals its children after the user holds the left mouse button anywhere on
 * the page for `holdDuration` milliseconds (200 ms by default). In normal mode
 * the children disappear on release; with `toggle` enabled they remain visible
 * until explicitly closed.
 *
 * Toggled content can be closed by clicking an element matching `closeSelector`
 * (`[data-click-hold-close]` by default), or without a UI interaction by
 * dispatching `new Event(closeEvent)` on `window` (`click-hold:close` by
 * default). The component is disabled and reset whenever the drawer is open.
 *
 * @example
 * <ClickHold toggle>
 *   <button data-click-hold-close>Close</button>
 * </ClickHold>
 */
const ClickHold: FC<IClickHoldProps> = (props) => {
  const { isDrawerOpen } = useDrawer();

  if (isDrawerOpen) {
    return null;
  }

  return <ClickHoldContent {...props} />;
};

export {
  ClickHold,
  useClickHoldPosition,
  type IClickHoldPosition,
  type IClickHoldProps,
};
