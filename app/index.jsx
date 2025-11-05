import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native';
import { getTasks, toggleTask, deleteTask } from '../utils/TaskStorage';
import { useFocusEffect, router } from 'expo-router'; 
import { Feather } from '@expo/vector-icons'; 
import { useTheme } from './ThemeContext'; 

const TaskCard = React.memo(({ task, onToggle, onDelete }) => {
  const { theme } = useTheme(); 
  const isCompleted = task.concluida;

  const handleEdit = () => {
    router.push({
        pathname: "/add",
        params: { id: task.id }
    });
  };

  const cardStyles = StyleSheet.create({
    taskCard: {
        borderLeftColor: isCompleted ? theme.successAccent : theme.primaryAccent,
        backgroundColor: isCompleted ? (theme.isDarkMode ? '#282828' : '#E8F5E9') : theme.cardBackground,
    },
    taskTitle: {
        color: theme.text,
    },
    taskDescription: {
        color: theme.secondaryText,
    },
    textStrikethrough: {
        color: theme.secondaryText,
    },
    deleteButton: {
        color: theme.danger,
    },
    editButton: {
        color: theme.primaryAccent,
    }
  });

  return (
    <View style={[styles.taskCard, cardStyles.taskCard]} key={task.id}>
      
      <TouchableOpacity 
        onPress={() => onToggle(task.id)} 
        onLongPress={handleEdit} 
        style={styles.contentArea}
      >
        <Feather 
          name={isCompleted ? 'check-square' : 'square'} 
          size={24} 
          color={isCompleted ? theme.successAccent : theme.secondaryText} 
          style={{ marginRight: 15 }} 
        />
        <View style={styles.textContainer}>
          <Text style={[styles.taskTitle, cardStyles.taskTitle, isCompleted && styles.textStrikethrough]}>
            {task.titulo}
          </Text>
          {task.descricao ? (
            <Text style={[styles.taskDescription, cardStyles.taskDescription, isCompleted && styles.textStrikethrough]} numberOfLines={1}>
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
          <Feather name='edit' size={20} color={cardStyles.editButton.color} />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => onDelete(task.id)}
          style={styles.deleteButton}
        >
          <Feather name='trash-2' size={22} color={cardStyles.deleteButton.color} />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default function IndexScreen() {
  const { theme } = useTheme(); 
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddPress = () => {
    router.push("/add");
  };

  const handleSettingsPress = () => {
    router.push("/settings");
  };

  const dynamicStyles = StyleSheet.create({
    container: {
        backgroundColor: theme.background,
    },
    header: {
        backgroundColor: theme.header,
    },
    headerDate: {
        color: theme.secondaryText,
    },
    headerLogoText: {
        color: theme.text,
    },
    settingsButton: {
        color: theme.text,
    },
    emptyText: {
        color: theme.secondaryText,
    },
    floatingButton: {
        backgroundColor: theme.primaryButton,
    }
  });

  const loadTasks = async () => {
    setIsLoading(true);
    const loadedTasks = await getTasks();
    loadedTasks.sort((a, b) => a.concluida - b.concluida);
    setTasks(loadedTasks);
    setIsLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const handleToggle = async (id) => {
    const updatedTasks = await toggleTask(id);
    setTasks(updatedTasks.sort((a, b) => a.concluida - b.concluida));
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza que deseja excluir esta tarefa?",
      [
        { text: "Cancelar", style: "cancel" },
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
        <ActivityIndicator size="large" color={theme.text} />
        <Text style={[styles.loadingText, { color: theme.secondaryText }]}>Carregando Tarefas...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      {/* Seção do Cabeçalho */}
      <View style={[styles.header, dynamicStyles.header]}>
        <Text style={[styles.headerDate, dynamicStyles.headerDate]}>Segunda, Setembro 27</Text>
        <View style={styles.titleContainer}>
            <Text style={[styles.headerLogoText, dynamicStyles.headerLogoText]}>ToDoApp</Text>
            <Text style={{ fontSize: 28, marginLeft: 5 }}>📋</Text>
        </View>
        <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
            <Feather name='settings' size={24} color={dynamicStyles.settingsButton.color} />
        </TouchableOpacity>
      </View>

      {/* Lista de Tarefas */}
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Feather name='list' size={40} color={theme.secondaryText} />
          <Text style={[styles.emptyText, dynamicStyles.emptyText]}>Nenhuma tarefa cadastrada. Clique no '+' para começar!</Text>
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

      {/* Botão Flutuante (CORREÇÃO APLICADA AQUI) */}
      <TouchableOpacity 
        style={[styles.floatingButton, dynamicStyles.floatingButton]}
        onPress={handleAddPress}
      >
        <Feather name='plus' size={30} color='#FFF' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    padding: 15,
    paddingTop: 40,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2.84,
    alignItems: 'center', 
  },
  headerDate: {
    fontSize: 14,
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
    fontSize: 28,
    fontWeight: 'normal', 
  },
  settingsButton: {
    position: 'absolute',
    right: 15,
    top: 50, 
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
    textAlign: 'center',
  },
  taskCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    borderLeftWidth: 5,
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
  },
  taskDescription: {
    fontSize: 14,
  },
  textStrikethrough: {
    textDecorationLine: 'line-through',
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
  floatingButton: {
    position: 'absolute', 
    zIndex: 9999,        
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});