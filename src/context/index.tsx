"use client";
import React, { useContext, useState } from "react";

type UserContextType = {
  isDarkMode: boolean;
  setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  openScanner: boolean;
  setOpenScanner: React.Dispatch<React.SetStateAction<boolean>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [openScanner, setOpenScanner] = useState(false);
  const [address, setAddress] = useState("");

  return (
    <UserContext.Provider
      value={{
        isDarkMode,
        setIsDarkMode,
        currentStep,
        setCurrentStep,
        openScanner,
        setOpenScanner,
        address,
        setAddress,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useClient = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useClient must be used within a UserContextProvider");
  }
  return context;
};
