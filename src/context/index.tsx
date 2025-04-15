"use client";
import React, { useContext, useState } from "react";


const UserContext = React.createContext<{
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;

}>({
    isDarkMode:true,
    setIsDarkMode: () => {},    

});

export const useUserContext = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);


    
    
    return {
       isDarkMode, setIsDarkMode
    };
}; 

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const auth = useUserContext();
    return (
        <UserContext.Provider value={auth}>
            {children}
        </UserContext.Provider>
    );
};

export const useClient = () => useContext(UserContext);
