import React from 'react';
import { Stack } from 'expo-router';
// Importa o novo provedor de tema
import { ThemeProvider } from './ThemeContext'; 

// Esta é a raiz do seu aplicativo
export default function RootLayout() {
  return (
    // Envolve todo o aplicativo com o ThemeProvider
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}