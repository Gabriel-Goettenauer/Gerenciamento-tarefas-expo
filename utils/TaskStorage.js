import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'ToDoApp:tasks';

/**

 * @returns {Promise<Array>} Lista de tarefas.
 */
export const getTasks = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);

    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error("Erro ao carregar tarefas:", e);
    return [];
  }
};

/**
 * @param {Array} tasks - Lista de tarefas a serem salvas.
 */
const saveTasks = async (tasks) => {
  try {
    const jsonValue = JSON.stringify(tasks);
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error("Erro ao salvar tarefas:", e);
  }
};

/**
 * 
 * @param {string} titulo
 * @param {string} descricao 
 */
export const addTask = async (titulo, descricao) => {
  const newTask = {
    id: uuidv4(),
    titulo,
    descricao,
    concluida: false,
    dataCriacao: new Date().toISOString(),
  };

  const currentTasks = await getTasks();
  const updatedTasks = [...currentTasks, newTask];
  await saveTasks(updatedTasks);
  return updatedTasks; 
};

/**
 * @param {string} id - ID da tarefa a ser alterada.
 */
export const toggleTask = async (id) => {
  const currentTasks = await getTasks();
  const updatedTasks = currentTasks.map(task =>
    task.id === id
      ? { ...task, concluida: !task.concluida, dataConclusao: task.concluida ? null : new Date().toISOString() }
      : task
  );
  await saveTasks(updatedTasks);
  return updatedTasks;
};

/**
 * @param {string} id - ID da tarefa a ser removida.
 */
export const deleteTask = async (id) => {
  const currentTasks = await getTasks();
  const updatedTasks = currentTasks.filter(task => task.id !== id);
  await saveTasks(updatedTasks);
  return updatedTasks;
};

export { uuidv4 };