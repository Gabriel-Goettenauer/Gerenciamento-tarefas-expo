import 'react-native-get-random-values';
import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from './ThemeContext'; 

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}