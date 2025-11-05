import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { addTask, updateTask, getTaskById } from '../utils/TaskStorage';
import { router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons'; 
import { useTheme } from './ThemeContext'; // Importa o hook do tema

export default function AddTaskScreen() {
  const { theme } = useTheme(); // Puxa o tema
  const { id } = useLocalSearchParams(); 
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');

  // Estilos dinâmicos
  const dynamicStyles = StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
    header: {
        backgroundColor: theme.header,
    },
    headerTitle: {
        color: theme.text,
    },
    backButton: {
        color: theme.text,
    },
    label: {
        color: theme.text,
    },
    input: {
        backgroundColor: theme.cardBackground,
        borderColor: theme.secondaryText,
        color: theme.text,
    },
    saveButton: {
        backgroundColor: theme.primaryAccent,
    },
    saveButtonDisabled: {
        backgroundColor: theme.secondaryText,
    }
  });

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
        await updateTask(id, title.trim(), description.trim());
        Alert.alert("Sucesso", "Tarefa editada com sucesso!");
      } else {
        await addTask(title.trim(), description.trim());
        Alert.alert("Sucesso", "Tarefa cadastrada com sucesso!");
      }
      
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
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Seção do Cabeçalho */}
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={dynamicStyles.backButton.color} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.headerTitle]}>{headerText}</Text>
        <View style={{ width: 30 }} /> 
      </View>

      <View style={styles.form}>
        
        {/* Input de Título */}
        <Text style={[styles.label, dynamicStyles.label]}>Título (Obrigatório)</Text>
        <TextInput
          style={[styles.input, dynamicStyles.input, error && styles.inputError]}
          placeholder="Ex: Reunião com o orientador"
          placeholderTextColor={theme.secondaryText}
          value={title}
          onChangeText={setTitle}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}


        {/* Input de Descrição */}
        <Text style={[styles.label, dynamicStyles.label]}>Descrição (Opcional)</Text>
        <TextInput
          style={[styles.input, dynamicStyles.input, styles.textArea]}
          placeholder="Detalhes da reunião sobre o TCC..."
          placeholderTextColor={theme.secondaryText}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        {/* Botão de Salvar */}
        <TouchableOpacity
          style={[styles.saveButton, dynamicStyles.saveButton, isLoading && dynamicStyles.saveButtonDisabled]}
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

// Estilos estáticos
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
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
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#F44336', // Cor de erro é mantida
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
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: 'center',
    elevation: 3,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});