import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useTheme } from './ThemeContext'; 

export default function SettingsScreen() {
  const { theme, isDarkMode, toggleTheme } = useTheme(); 

  const dynamicStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    headerTitle: {
        color: theme.text,
        fontSize: 20,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: theme.cardBackground,
    },
    sectionTitle: {
        color: theme.secondaryText,
    },
    settingText: {
        color: theme.text,
    },
    aboutText: {
        color: theme.secondaryText,
    },
    footerText: {
        color: theme.text,
    }
  });


  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Seção do Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={theme.text} /> 
        </TouchableOpacity>
        <Text style={dynamicStyles.headerTitle}>Configurações</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <ScrollView style={styles.scrollContent}>
        
        {/* Card de Configurações */}
        <View style={[styles.card, dynamicStyles.card]}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Beta</Text>
            
            <View style={styles.settingItem}>
                <Text style={[styles.settingText, dynamicStyles.settingText]}>Dark mode</Text>
                <Switch
                    // Usa cores dinâmicas e a função toggleTheme
                    trackColor={{ false: theme.secondaryText, true: theme.primaryAccent }}
                    thumbColor={theme.cardBackground}
                    onValueChange={toggleTheme}
                    value={isDarkMode}
                />
            </View>
        </View>

        {/* Card Sobre o App */}
        <View style={[styles.card, dynamicStyles.card]}>
            <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Sobre o App</Text>
            <Text style={[styles.aboutText, dynamicStyles.aboutText]}>
                O ToDoApp é um gerenciador de tarefas intuitivo e minimalista, 
                desenvolvido para ajudar você a organizar o seu dia a dia. 
                Com ele, é possível criar, gerenciar e acompanhar suas 
                tarefas de forma simples, garantindo mais produtividade e foco.
            </Text>
            <Text style={[styles.versionText, dynamicStyles.sectionTitle]}>Versão: 1.0.0</Text>
        </View>

      </ScrollView>

      {/* Footer com a Logo */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, dynamicStyles.footerText]}>ToDoApp</Text>
        <Text style={{ fontSize: 24, marginLeft: 5 }}> 📋</Text> 
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 15,
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  versionText: {
    marginTop: 5,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});