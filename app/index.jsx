import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';


import TaskCard from '../components/TaskCard';

const initialTasks = [
  { id: '1', title: 'Reunião 14 hrs', isDone: false, description: 'Preparar a apresentação.' },
  { id: '2', title: 'Remédio', isDone: true, description: 'Tomar o da manhã.' },
  { id: '3', title: 'Treinamento 42', isDone: false, description: 'Finalizar o módulo de React Native.' },
  { id: '4', title: 'Comprar pão', isDone: false, description: 'Passar na padaria depois do trabalho.' },
];

export default function IndexScreen() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggleTask = (id) => {
    setTasks(currentTasks => 
      currentTasks.map(task => 
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(currentTasks => currentTasks.filter(task => task.id !== id));
  };

  const renderItem = ({ item }) => (
    <TaskCard
      title={item.title}
      isDone={item.isDone}
      onToggle={() => toggleTask(item.id)}
      onDelete={() => deleteTask(item.id)}
    />
  );


  return (
    <View style={styles.container}>
      {/* Cabeçalho personalizado da tela principal */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ToDoApp</Text>
        
        {/* Botão para Configurações (Engrenagem) */}
        <Link href="/settings" asChild>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>
        </Link>
      </View>
      
      {/* Exibição da Lista de Tarefas (Usando FlatList para performance) */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.taskList}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>Nenhuma tarefa por enquanto! 🎉</Text>
        )}
      />

      {/* Botão Flutuante para Adicionar Tarefa */}
      <Link href="/add" asChild>
        <TouchableOpacity style={styles.fab}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9', 
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#424242',
  },
  headerButton: {
    padding: 10,
  },
  icon: {
    fontSize: 24,
  },
  taskList: {
    paddingHorizontal: 20,
    paddingBottom: 100, 
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#757575',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
    backgroundColor: '#4CAF50', 
    borderRadius: 30,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
});
