import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getTasks, toggleTask, deleteTask } from '../utils/TaskStorage';
import { Link, useFocusEffect } from 'expo-router';
import { ListItem, Icon, Button } from 'react-native-elements';

const TaskCard = ({ task, onToggle, onDelete }) => (
  <ListItem 
    bottomDivider
    containerStyle={task.concluida ? styles.taskCompleted : styles.taskPending}
  >
    <ListItem.Content>
      <TouchableOpacity onPress={() => onToggle(task.id)}>
        <ListItem.Title style={task.concluida ? styles.titleCompleted : styles.titlePending}>
          {task.titulo}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1}>
          {task.descricao}
        </ListItem.Subtitle>
      </TouchableOpacity>
    </ListItem.Content>
    <Icon 
      name='delete' 
      type='material' 
      color='#ff0000' 
      onPress={() => onDelete(task.id)} 
      containerStyle={{ marginLeft: 10 }}
    />
  </ListItem>
);

const CustomButton = () => (
  <Link href="/add" asChild>
    <TouchableOpacity style={styles.floatingButton}>
      <Icon name='add' type='material' color='#FFF' size={30} />
    </TouchableOpacity>
  </Link>
);

export default function IndexScreen() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
    return <Text style={styles.loadingText}>Carregando Tarefas...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Minhas Tarefas</Text>
      {tasks.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Icon name='check-circle-outline' type='material' color='#6200EE' size={50} />
          <Text style={styles.emptyText}>Nenhuma tarefa cadastrada. Adicione uma nova!</Text>
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
        />
      )}
      <CustomButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
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
    color: '#666',
    textAlign: 'center',
  },
  
  taskPending: {
    backgroundColor: '#FFF',
  },
  taskCompleted: {
    backgroundColor: '#e0e0e0',
  },
  titlePending: {
    fontSize: 16,
    color: '#333',
  },
  titleCompleted: {
    fontSize: 16,
    color: '#999',
    textDecorationLine: 'line-through',
  },

  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#6200EE', 
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
});