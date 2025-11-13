import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid'; 

const TASK_STORAGE_KEY = 'todo_tasks';
const THEME_STORAGE_KEY = 'todo_app_theme';

/**
 * Busca todas as tarefas salvas no AsyncStorage.
 * @returns {Array} Lista de tarefas.
 */
export const getAllTasks = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem(TASK_STORAGE_KEY);
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.error("Erro ao buscar tarefas:", e);
        return [];
    }
};

export const saveTask = async (newTaskData) => {
    try {
        const existingTasks = await getAllTasks();
        
        const newTask = {
            id: uuidv4(), 
            titulo: newTaskData.titulo,
            descricao: newTaskData.descricao,
            concluida: false,
        };

        const updatedTasks = [newTask, ...existingTasks];
        await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (e) {
        console.error("Erro ao salvar nova tarefa:", e);
        throw e;
    }
};

export const getTaskById = async (id) => {
    const tasks = await getAllTasks();
    return tasks.find(task => task.id === id) || null;
};

export const updateExistingTask = async (id, updatedData) => {
    try {
        const tasks = await getAllTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);

        if (taskIndex > -1) {
            const taskToUpdate = tasks[taskIndex];
            
            const updatedTask = {
                ...taskToUpdate,
                ...updatedData,
            };

            tasks[taskIndex] = updatedTask;

            await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
        } else {
            console.warn(`Tarefa com ID ${id} não encontrada para atualização.`);
        }
    } catch (e) {
        console.error("Erro ao atualizar tarefa:", e);
        throw e;
    }
};

export const deleteTask = async (id) => {
    try {
        const tasks = await getAllTasks();
        const updatedTasks = tasks.filter(task => task.id !== id);
        
        await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(updatedTasks));
    } catch (e) {
        console.error("Erro ao deletar tarefa:", e);
        throw e;
    }
};

export const toggleTaskStatus = async (id, currentStatus) => {
    await updateExistingTask(id, { concluida: !currentStatus });
};

export const getThemePreference = async () => {
    try {
        const theme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        return theme || 'dark'; 
    } catch (e) {
        console.error("Erro ao buscar tema:", e);
        return 'dark';
    }
};

export const saveThemePreference = async (themeName) => {
    try {
        await AsyncStorage.setItem(THEME_STORAGE_KEY, themeName);
    } catch (e) {
        console.error("Erro ao salvar tema:", e);
        throw e;
    }
};