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
  invoiceSats: number;
  setInvoiceSats: React.Dispatch<React.SetStateAction<number>>;
  createdInvoice: string;
  setCreatedInvoice: React.Dispatch<React.SetStateAction<string>>;
  steps:number;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [openScanner, setOpenScanner] = useState(false);
  const [address, setAddress] = useState("");
  const [invoiceSats, setInvoiceSats] = useState(0);
  const [createdInvoice, setCreatedInvoice] = useState("");
  const [steps, setSteps] = useState(0);

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
        invoiceSats,  
        setInvoiceSats,
        createdInvoice,
        setCreatedInvoice,
        steps,
        setSteps
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
