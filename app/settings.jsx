import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false); // Estado para o Dark Mode

  return (
    <View style={styles.container}>
      {/* Seção do Cabeçalho - Usando o fundo padrão do seu app */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#000" /> {/* Ícone preto para contraste com o fundo claro */}
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={{ width: 30 }} /> {/* Placeholder para centralizar o título */}
      </View>

      <ScrollView style={styles.scrollContent}>
        
        {/* Card de Configurações */}
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>Beta</Text>
            
            <View style={styles.settingItem}>
                <Text style={styles.settingText}>Dark mode</Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={darkMode ? "#2196F3" : "#f4f3f4"}
                    onValueChange={setDarkMode}
                    value={darkMode}
                />
            </View>
        </View>

        {/* Card Sobre o App */}
        <View style={styles.card}>
            <Text style={styles.sectionTitle}>Sobre o App</Text>
            <Text style={styles.aboutText}>
                O ToDoApp é um gerenciador de tarefas intuitivo e minimalista, 
                desenvolvido para ajudar você a organizar o seu dia a dia. 
                Com ele, é possível criar, gerenciar e acompanhar suas 
                tarefas de forma simples, garantindo mais produtividade e foco.
            </Text>
            <Text style={styles.versionText}>Versão: 1.0.0</Text>
        </View>

      </ScrollView>

      {/* Footer com a Logo */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ToDoApp</Text>
        {/* Ícone de ToDo (usando emoji ou Feather, já que não temos a imagem original) */}
        <Text style={{ fontSize: 24 }}> 📋</Text> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Fundo azul claro, como no seu design
  },
  header: {
    padding: 15,
    backgroundColor: 'transparent',
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#757575',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingText: {
    fontSize: 16,
    color: '#212121',
  },
  aboutText: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 10,
    lineHeight: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#757575',
    marginTop: 5,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginRight: 5,
  },
});