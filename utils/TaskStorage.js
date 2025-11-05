import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values'; 
import { v4 as uuidv4 } from 'uuid'; 

const STORAGE_KEY = '@ToDoApp:tasks';

// ----------------------------------------------------
// 1. LEITURA (READ)
// ----------------------------------------------------
/**
 * Obtém todas as tarefas salvas no AsyncStorage.
 * @returns {Promise<Array>} Lista de tarefas.
 */
export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    // Retorna o array de tarefas, ou um array vazio se nada for encontrado
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao ler tarefas:", e);
    return [];
  }
};

// ----------------------------------------------------
// 2. CRIAÇÃO (CREATE)
// ----------------------------------------------------
/**
 * Adiciona uma nova tarefa à lista.
 * @param {string} titulo - O título da tarefa.
 * @param {string} descricao - A descrição da tarefa.
 * @returns {Promise<Array>} Lista atualizada de tarefas.
 */
export const addTask = async (titulo, descricao) => {
  const newTask = {
    // Usa uuidv4 para gerar um ID único
    id: uuidv4(),
    titulo,
    descricao,
    concluida: false, // Nova tarefa sempre começa como pendente
  };

  const currentTasks = await getTasks();
  const updatedTasks = [...currentTasks, newTask];

  try {
    const jsonValue = JSON.stringify(updatedTasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return updatedTasks;
  } catch (e) {
    console.error("Erro ao salvar tarefa:", e);
    throw e;
  }
};

// ----------------------------------------------------
// 3. ALTERAÇÃO (UPDATE - TOGGLE)
// ----------------------------------------------------
/**
 * Alterna o estado de conclusão (concluida/pendente) de uma tarefa.
 * @param {string} id - O ID da tarefa a ser alterada.
 * @returns {Promise<Array>} Lista atualizada de tarefas.
 */
export const toggleTask = async (id) => {
  const currentTasks = await getTasks();
  const updatedTasks = currentTasks.map(task =>
    task.id === id ? { ...task, concluida: !task.concluida } : task
  );

  try {
    const jsonValue = JSON.stringify(updatedTasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return updatedTasks;
  } catch (e) {
    console.error("Erro ao alternar tarefa:", e);
    throw e;
  }
};

// ----------------------------------------------------
// 4. EDIÇÃO (UPDATE - COMPLETO)
// ----------------------------------------------------
/**
 * Edita o título e a descrição de uma tarefa existente.
 * @param {string} id - O ID da tarefa a ser editada.
 * @param {string} newTitle - O novo título.
 * @param {string} newDescription - A nova descrição.
 * @returns {Promise<Array>} Lista atualizada de tarefas.
 */
export const updateTask = async (id, newTitle, newDescription) => {
  const currentTasks = await getTasks();
  const updatedTasks = currentTasks.map(task =>
    task.id === id 
      ? { ...task, titulo: newTitle, descricao: newDescription } 
      : task
  );

  try {
    const jsonValue = JSON.stringify(updatedTasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return updatedTasks;
  } catch (e) {
    console.error("Erro ao editar tarefa:", e);
    throw e;
  }
};

// ----------------------------------------------------
// 5. EXCLUSÃO (DELETE)
// ----------------------------------------------------
/**
 * Remove uma tarefa da lista.
 * @param {string} id - O ID da tarefa a ser excluída.
 * @returns {Promise<Array>} Lista atualizada de tarefas.
 */
export const deleteTask = async (id) => {
  const currentTasks = await getTasks();
  const updatedTasks = currentTasks.filter(task => task.id !== id);

  try {
    const jsonValue = JSON.stringify(updatedTasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
    return updatedTasks;
  } catch (e) {
    console.error("Erro ao deletar tarefa:", e);
    throw e;
  }
};

// ----------------------------------------------------
// 6. BUSCA ÚNICA (UTILIDADE PARA EDIÇÃO)
// ----------------------------------------------------
/**
 * Busca uma tarefa específica pelo ID.
 * @param {string} id - O ID da tarefa.
 * @returns {Promise<Object | undefined>} A tarefa encontrada ou undefined.
 */
export const getTaskById = async (id) => {
  const currentTasks = await getTasks();
  return currentTasks.find(task => task.id === id);
};