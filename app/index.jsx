import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native';
import { getTasks, toggleTask, deleteTask } from '../utils/TaskStorage';
import { Link, useFocusEffect, router } from 'expo-router'; 
import { Feather } from '@expo/vector-icons'; 

// -------------------------------------------------------------------
// Componente de Cartão de Tarefa
// -------------------------------------------------------------------
const TaskCard = ({ task, onToggle, onDelete }) => {
  const isCompleted = task.concluida;

  // Função para navegar para a tela de edição, passando o ID da tarefa
  const handleEdit = () => {
    router.push({
        pathname: "/add",
        params: { id: task.id }
    });
  };

  return (
    <View style={[styles.taskCard, isCompleted && styles.taskCompleted]} key={task.id}>
      
      {/* Ícone de status (esquerda) e Conteúdo (Torna o Conteúdo Editável ao toque) */}
      <TouchableOpacity 
        onPress={() => onToggle(task.id)} 
        onLongPress={handleEdit} 
        style={styles.contentArea}
      >
        {/* Ícone de status */}
        <Feather 
          name={isCompleted ? 'check-square' : 'square'} 
          size={24} 
          color={isCompleted ? '#4CAF50' : '#757575'} 
          style={{ marginRight: 15 }} 
        />
        <View style={styles.textContainer}>
          <Text style={[styles.taskTitle, isCompleted && styles.textStrikethrough]}>
            {task.titulo}
          </Text>
          {task.descricao ? (
            <Text style={[styles.taskDescription, isCompleted && styles.textStrikethrough]} numberOfLines={1}>
              {task.descricao}
            </Text>
          ) : null}
        </View>
      </TouchableOpacity>
      
      {/* Botões de Ação (Editar e Excluir) */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          onPress={handleEdit} 
          style={styles.editButton}
        >
          <Feather name='edit' size={20} color='#2196F3' />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => onDelete(task.id)}
          style={styles.deleteButton}
        >
          <Feather name='trash-2' size={22} color='#F44336' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// -------------------------------------------------------------------
// Componente Principal
// -------------------------------------------------------------------
export default function IndexScreen() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Função para carregar as tarefas do AsyncStorage
  const loadTasks = async () => {
    setIsLoading(true);
    const loadedTasks = await getTasks();
    // Ordena as tarefas: pendentes primeiro, depois as concluídas
    loadedTasks.sort((a, b) => a.concluida - b.concluida);
    setTasks(loadedTasks);
    setIsLoading(false);
  };

  // Garante que as tarefas sejam recarregadas sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  // Manipulador para alternar o estado da tarefa
  const handleToggle = async (id) => {
    const updatedTasks = await toggleTask(id);
    setTasks(updatedTasks.sort((a, b) => a.concluida - b.concluida));
  };

  // Manipulador para deletar a tarefa
  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esta tarefa?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: async () => {
            const updatedTasks = await deleteTask(id);
            setTasks(updatedTasks.sort((a, b) => a.concluida - b.concluida));
          },
          style: 'destructive'
        }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando Tarefas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Seção do Cabeçalho - MODIFICADA PARA TER O LOGO E O ÍCONE DE CONFIGURAÇÕES */}
      <View style={styles.header}>
        <Text style={styles.headerDate}>Segunda, Setembro 27</Text>
        <View style={styles.titleContainer}>
            <Text style={styles.headerLogoText}>ToDoApp</Text>
            <Text style={{ fontSize: 28, marginLeft: 5 }}>📋</Text>
        </View>
        <Link href="/settings" asChild>
            <TouchableOpacity style={styles.settingsButton}>
                <Feather name='settings' size={24} color='#333' />
            </TouchableOpacity>
        </Link>
      </View>

      {/* Lista de Tarefas */}
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name='list' size={40} color='#BDBDBD' />
          <Text style={styles.emptyText}>Nenhuma tarefa cadastrada. Clique no '+' para começar!</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard 
              task={item} 
              onToggle={handleToggle} 
              onDelete={handleDelete} 
            />
          )}
          style={styles.list}
        />
      )}

      {/* Botão Flutuante (Seu Visual) */}
      <Link href="/add" asChild>
        <TouchableOpacity style={styles.floatingButton}>
          <Feather name='plus' size={30} color='#FFF' />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF', // Fundo azul claro, como no seu design
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 15,
    backgroundColor: '#ADD8E6', // Fundo azul claro do seu header
    paddingTop: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2.84,
    alignItems: 'center', // Centraliza o conteúdo (Data e Logo)
  },
  headerDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 50,
  },
  headerLogoText: {
    color: '#333',
    fontSize: 28,
    fontWeight: 'normal', // Mantenha o peso normal para imitar a fonte do seu design
  },
  settingsButton: {
    position: 'absolute',
    right: 15,
    top: 50, // Ajuste a posição vertical
    padding: 5,
  },
  list: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#9E9E9E',
    textAlign: 'center',
  },
  // Estilos do Cartão de Tarefa (Seu Visual)
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    borderLeftWidth: 5,
    borderLeftColor: '#2196F3', // Cor padrão (Azul)
  },
  taskCompleted: {
    borderLeftColor: '#4CAF50', // Cor de concluído (Verde)
    backgroundColor: '#E8F5E9',
  },
  contentArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
  },
  taskDescription: {
    fontSize: 14,
    color: '#757575',
  },
  textStrikethrough: {
    textDecorationLine: 'line-through',
    color: '#9E9E9E',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    padding: 10,
  },
  deleteButton: {
    padding: 10,
    marginLeft: 5, 
  },
  // Estilo do Botão Flutuante (Seu Visual)
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#40E0D0', // Cor turquesa/ciano, como no seu design
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});