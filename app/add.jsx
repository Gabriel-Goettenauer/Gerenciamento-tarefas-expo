import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { addTask, updateTask, getTaskById } from '../utils/TaskStorage';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons'; 

export default function AddTaskScreen() {
  // Pega os parâmetros passados na navegação (se for uma edição, terá o 'id')
  const { id } = useLocalSearchParams(); 
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Novo estado para saber se está editando
  const [error, setError] = useState('');

  // Efeito para carregar a tarefa se um ID for passado (Modo Edição)
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const loadTask = async () => {
        const task = await getTaskById(id);
        if (task) {
          setTitle(task.titulo);
          setDescription(task.descricao);
        } else {
          Alert.alert("Erro", "Tarefa não encontrada!");
          router.back();
        }
      };
      loadTask();
    }
  }, [id]);

  // Função que executa a validação e salva/edita a tarefa
  const handleSave = async () => {
    setError(''); 
    
    // Validação: Título é obrigatório
    if (!title.trim()) {
      setError('O título da tarefa não pode ser vazio!');
      Alert.alert("Erro", "Por favor, preencha o campo Título."); 
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing) {
        // Se estiver editando, chama updateTask
        await updateTask(id, title.trim(), description.trim());
        Alert.alert("Sucesso", "Tarefa editada com sucesso!");
      } else {
        // Caso contrário, chama addTask
        await addTask(title.trim(), description.trim());
        Alert.alert("Sucesso", "Tarefa cadastrada com sucesso!");
      }
      
      // Sucesso: Volta para a tela principal
      router.back(); 

    } catch (e) {
      console.error("Erro ao salvar/editar a tarefa:", e);
      Alert.alert("Erro", "Não foi possível salvar a tarefa. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const headerText = isEditing ? 'Editar Tarefa' : 'Criar Nova Tarefa';
  const buttonText = isEditing ? 'Salvar Edição' : 'Salvar Tarefa';

  return (
    <View style={styles.container}>
      {/* Seção do Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{headerText}</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <View style={styles.form}>
        
        {/* Input de Título */}
        <Text style={styles.label}>Título (Obrigatório)</Text>
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder="Ex: Reunião com o orientador"
          value={title}
          onChangeText={setTitle}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}


        {/* Input de Descrição */}
        <Text style={styles.label}>Descrição (Opcional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Detalhes da reunião sobre o TCC..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        {/* Botão de Salvar */}
        <TouchableOpacity
          style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.saveButtonText}>{buttonText}</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  header: {
    padding: 15,
    backgroundColor: '#4CAF50', // Cor do seu header
    paddingTop: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 5,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#BDBDBD',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFF',
  },
  inputError: {
    borderColor: '#F44336',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#F44336',
    marginTop: 5,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    elevation: 3,
  },
  saveButtonDisabled: {
    backgroundColor: '#90CAF9',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});