"use client";
import React, { useContext, useState } from "react";

type UserContextType = {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    
    return (
        <UserContext.Provider value={{ isDarkMode, setIsDarkMode, currentStep, setCurrentStep }}>
            {children}
        </UserContext.Provider>
    );
};

export const useClient = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useClient must be used within a UserContextProvider');
    }
    return context;
};