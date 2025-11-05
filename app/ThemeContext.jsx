import React, { createContext, useState, useEffect, useContext } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. Definição das cores para os dois temas
const lightTheme = {
  background: '#F0F8FF',     // Fundo principal (azul claro do seu design)
  cardBackground: '#FFF',    // Fundo dos cartões (branco)
  text: '#333',              // Texto padrão
  secondaryText: '#757575',  // Textos menores
  header: '#ADD8E6',         // Fundo do cabeçalho
  primaryButton: '#40E0D0',  // Botão flutuante (Ciano)
  primaryAccent: '#2196F3',  // Borda de tarefa pendente (Azul)
  successAccent: '#4CAF50',  // Borda de tarefa concluída (Verde)
  danger: '#F44336',         // Excluir (Vermelho)
};

const darkTheme = {
  background: '#121212',
  cardBackground: '#1E1E1E',
  text: '#E0E0E0',
  secondaryText: '#B0B0B0',
  header: '#1E1E1E',
  primaryButton: '#00BFFF', // Ciano mais brilhante
  primaryAccent: '#7B68EE', // Azul mais escuro
  successAccent: '#8BC34A', // Verde
  danger: '#FF6347',        // Vermelho
};

// 2. Criação do Contexto
const ThemeContext = createContext();

// Chave para salvar a preferência no AsyncStorage
const THEME_STORAGE_KEY = '@ToDoApp:theme';

// 3. Provedor do Contexto
export const ThemeProvider = ({ children }) => {
  // Usa o esquema de cores do sistema como padrão inicial
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [theme, setTheme] = useState(isDarkMode ? darkTheme : lightTheme);
  const [isReady, setIsReady] = useState(false);

  // Efeito 1: Carregar preferência do usuário do AsyncStorage
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme !== null) {
          const isDark = storedTheme === 'dark';
          setIsDarkMode(isDark);
          setTheme(isDark ? darkTheme : lightTheme);
        } else {
          // Se não houver preferência salva, usa a do sistema
          setIsDarkMode(systemColorScheme === 'dark');
          setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
        }
      } catch (e) {
        console.error("Failed to load theme from storage", e);
      } finally {
        setIsReady(true);
      }
    };
    loadTheme();
  }, [systemColorScheme]);

  // Efeito 2: Salvar preferência do usuário sempre que mudar
  useEffect(() => {
    if (!isReady) return; // Não salvar antes de carregar
    const saveTheme = async () => {
      try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, isDarkMode ? 'dark' : 'light');
        setTheme(isDarkMode ? darkTheme : lightTheme);
      } catch (e) {
        console.error("Failed to save theme to storage", e);
      }
    };
    saveTheme();
  }, [isDarkMode, isReady]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 4. Hook para uso fácil
export const useTheme = () => useContext(ThemeContext);