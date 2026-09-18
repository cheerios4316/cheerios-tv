"use client";

import { createContext, ReactNode, useContext, useState } from "react";

interface IDrawerContext {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (isOpen: boolean) => void;
}

const DrawerContext = createContext<IDrawerContext | null>(null);

const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <DrawerContext value={{ isDrawerOpen, setIsDrawerOpen }}>
      {children}
    </DrawerContext>
  );
};

const useDrawer = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }

  return context;
};

export { DrawerProvider, useDrawer };
