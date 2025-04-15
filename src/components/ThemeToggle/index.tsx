"use client";
import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import {useClient} from "@/context/index";

const ThemeToggle = () => {
    const {isDarkMode, setIsDarkMode} = useClient();


    useEffect(() => {
        // Check localStorage for user's theme preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
        } else {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
        }
        setIsDarkMode(!isDarkMode);
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-3 my-auto rounded-full cursor-pointer bg-gray-200 dark:bg-gray-700 transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
            {isDarkMode ? (
                <FaSun className="text-yellow-400 w-3 h-3 transition-all duration-300" />
            ) : (
                <FaMoon className="text-gray-700 dark:text-gray-200 w-3 h-3 transition-all duration-300" />
            )}
        </button>
    );
};

export default ThemeToggle;