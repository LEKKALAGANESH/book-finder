import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';

const ThemeContext = createContext();

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(() => storage.get('bf_theme', false));

    const toggleTheme = () => {
        setIsDark(prev => !prev);
    };

    useEffect(() => {
        // Apply theme to document
        const root = document.documentElement;
        root.classList.toggle('dark', isDark);
        storage.set('bf_theme', isDark);
    }, [isDark]);

    const value = {
        isDark,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}
