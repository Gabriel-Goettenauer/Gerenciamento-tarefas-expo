// Conteúdo FINAL e CORRETO para app/add.jsx
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Icon, Text } from 'react-native-elements';
import { addTask } from '../utils/TaskStorage';
import { router } from 'expo-router';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Função que executa a validação e salva a tarefa
  const handleSave = async () => {
    setError(''); 
    
    // REQUISITO DE VALIDAÇÃO: Título é obrigatório
    if (!title.trim()) {
      setError('O título da tarefa não pode ser vazio!');
      Alert.alert("Erro de Validação", "Por favor, preencha o título da tarefa."); 
      return;
    }

    setIsLoading(true);
    try {
      await addTask(title.trim(), description.trim());
      
      // Sucesso: Volta para a tela principal
      router.back(); 
      
      Alert.alert("Sucesso", "Tarefa cadastrada com sucesso!");

    } catch (e) {
      console.error("Erro ao salvar a tarefa:", e);
      Alert.alert("Erro", "Não foi possível salvar a tarefa. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Criar Nova Tarefa</Text>

      <Input
        label="Título (Obrigatório)"
        placeholder="Ex: Pagar as contas de luz"
        value={title}
        onChangeText={setTitle}
        leftIcon={{ type: 'material', name: 'title' }}
        errorMessage={error} 
        containerStyle={styles.inputContainer}
      />

      <Input
        label="Descrição (Opcional)"
        placeholder="Ex: Usar o aplicativo do banco e agendar o pagamento"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        leftIcon={{ type: 'material', name: 'description' }}
        containerStyle={styles.inputContainer}
      />

      <Button
        title="Salvar Tarefa"
        buttonStyle={styles.saveButton}
        onPress={handleSave}
        loading={isLoading}
        disabled={isLoading}
        icon={!isLoading ? <Icon name='save' type='material' color='white' containerStyle={{ marginRight: 10 }} /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#6200EE',
    borderRadius: 8,
    paddingVertical: 12,
  },
});