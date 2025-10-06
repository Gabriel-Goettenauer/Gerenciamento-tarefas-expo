// Tela para configurações do app (Modo Escuro e Sobre o App)
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { useState } from 'react';

export default function SettingsScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <View style={styles.container}>
      {/* Personaliza o cabeçalho desta tela */}
      <Stack.Screen
        options={{
          headerTitle: 'Configurações',
        }}
      />
      
      {/* Opção de Modo Escuro */}
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Modo Escuro</Text>
        <Switch
          trackColor={{ false: "#E0E0E0", true: "#4CAF50" }}
          thumbColor={isDarkMode ? "#FFFFFF" : "#F4F3F4"}
          ios_backgroundColor="#E0E0E0"
          onValueChange={setIsDarkMode}
          value={isDarkMode}
        />
      </View>
      
      {/* Opção Sobre o App */}
      <TouchableOpacity style={styles.settingItem}>
        <View>
          <Text style={styles.settingText}>Sobre o App</Text>
          <Text style={styles.versionText}>Versão: 1.0.0</Text>
        </View>
      </TouchableOpacity>
      
      {/* Texto descritivo para o requisito de 'Sobre o App' */}
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutText}>
          O ToDoApp é um gerenciador de tarefas intuitivo e minimalista, 
          desenvolvido para ajudar você a organizar o seu dia a dia.
          Com ele, é possível criar, gerenciar e acompanhar suas tarefas.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Fundo branco
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  settingText: {
    fontSize: 18,
    color: '#424242',
  },
  versionText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 2,
  },
  aboutContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  aboutText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  }
});
