import React, { createContext, useState, useContext, useEffect } from 'react';
import { getThemePreference, saveThemePreference } from '../utils/TaskStorage';


const themes = {
    light: {
        background: '#F8F8F8',
        text: '#1F2937', 
        secondaryText: '#6B7280', 
        headerBackground: '#FFFFFF',
        cardBackground: '#FFFFFF',
        primaryButton: '#10B981', 
        danger: '#EF4444', 
        shadow: '#000000',
        border: '#E5E7EB', 
        success: '#D1FAE5', 
        successText: '#065F46', 
    },
   
    dark: {
        background: '#0F172A',         
        text: '#F1F5F9',               
        secondaryText: '#94A3B8',      
        headerBackground: '#1E293B',
        cardBackground: '#334155',     
        primaryButton: '#34D399',      
        danger: '#F87171',            
        shadow: '#000000',
        border: '#475569',             
        success: '#059669',            
        successText: '#ECFDF5',       
    },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [themeName, setThemeName] = useState('dark');
    const theme = themes[themeName];

    useEffect(() => {
        const loadTheme = async () => {
            const savedTheme = await getThemePreference();
            setThemeName(savedTheme);
        };
        loadTheme();
    }, []);

    const toggleTheme = async () => {
        const newThemeName = themeName === 'light' ? 'dark' : 'light';
        setThemeName(newThemeName);
        await saveThemePreference(newThemeName);
    };

    return (
        <ThemeContext.Provider value={{ theme, themeName, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    return useContext(ThemeContext);
};

export default ThemeProvider;