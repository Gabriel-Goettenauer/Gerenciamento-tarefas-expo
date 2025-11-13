import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { getAllTasks, toggleTaskStatus, deleteTask } from '../utils/TaskStorage';
import { useTheme } from './ThemeContext'; 

export default function IndexScreen() {
    const { theme } = useTheme();
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const dynamicStyles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.background,
        },
        header: {
            backgroundColor: theme.headerBackground,
        },
        headerText: {
            color: theme.text,
        },
        addButton: {
            backgroundColor: theme.primaryButton,
            shadowColor: theme.shadow,
        },
        emptyText: {
            color: theme.secondaryText,
        },

        card: (isConcluida) => ({
            backgroundColor: isConcluida ? theme.success : theme.cardBackground,
            borderColor: isConcluida ? theme.success : theme.border,
        }),
        title: (isConcluida) => ({
            color: isConcluida ? theme.successText : theme.text,
            textDecorationLine: isConcluida ? 'line-through' : 'none',
        }),
        description: (isConcluida) => ({
            color: isConcluida ? theme.successText : theme.secondaryText,
            opacity: isConcluida ? 0.8 : 1,
        }),
        iconColor: (isConcluida) => ({
            color: isConcluida ? theme.successText : theme.primaryButton,
        }),
        deleteIconColor: (isConcluida) => ({
            color: isConcluida ? theme.successText : theme.danger,
        })
    });

    const loadTasks = async () => {
        setIsLoading(true);
        try {
            const loadedTasks = await getAllTasks(); 

            loadedTasks.sort((a, b) => a.concluida - b.concluida);
            setTasks(loadedTasks);

        } catch (error) {
            console.error("Falha ao carregar tarefas:", error);
            Alert.alert("Erro de Carga", "Não foi possível carregar suas tarefas salvas.");
            setTasks([]);
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            loadTasks();
            return () => {}; 
        }, [])
    );

    const handleToggleStatus = async (id, currentStatus) => {
        try {
            await toggleTaskStatus(id, currentStatus);
            loadTasks(); 
        } catch (e) {
            Alert.alert("Erro", "Não foi possível alterar o status da tarefa.");
        }
    };

    const handleDeleteTask = (id) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza de que deseja remover esta tarefa?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    onPress: async () => {
                        try {
                            await deleteTask(id);
                            loadTasks(); 
                        } catch (e) {
                            Alert.alert("Erro", "Não foi possível excluir a tarefa.");
                        }
                    },
                    style: "destructive"
                }
            ],
            { cancelable: true }
        );
    };

    const renderItem = ({ item }) => (
        <View style={[styles.card, dynamicStyles.card(item.concluida)]}>
            <View style={styles.textContainer}>
                <Text style={[styles.title, dynamicStyles.title(item.concluida)]} numberOfLines={1}>
                    {item.titulo}
                </Text>
                {item.descricao ? (
                    <Text style={[styles.description, dynamicStyles.description(item.concluida)]} numberOfLines={2}>
                        {item.descricao}
                    </Text>
                ) : null}
            </View>

            <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => handleToggleStatus(item.id, item.concluida)} style={styles.actionButton}>
                    <Feather 
                        name={item.concluida ? "check-circle" : "circle"} 
                        size={24} 
                        style={dynamicStyles.iconColor(item.concluida)} 
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.push(`/add?id=${item.id}`)} style={styles.actionButton}>
                    <Feather name="edit" size={20} style={dynamicStyles.iconColor(item.concluida)} />
                </TouchableOpacity>
             
                <TouchableOpacity onPress={() => handleDeleteTask(item.id)} style={styles.actionButton}>
                    <Feather name="trash-2" size={20} style={dynamicStyles.deleteIconColor(item.concluida)} />
                </TouchableOpacity>
            </View>
        </View>
    );

    if (isLoading && tasks.length === 0) {
        return (
            <View style={[styles.loadingContainer, dynamicStyles.container]}>
                <ActivityIndicator size="large" color={theme.primaryButton} />
                <Text style={[styles.loadingText, dynamicStyles.emptyText]}>Carregando tarefas...</Text>
            </View>
        );
    }
    
    return (
        <View style={dynamicStyles.container}>
            <View style={[styles.header, dynamicStyles.header]}>
                <Text style={[styles.headerText, dynamicStyles.headerText]}>ToDoApp📝</Text>

                <TouchableOpacity 
                    style={styles.settingsButton} 
                    onPress={() => router.push('/settings')}
                >
                    <Feather name="settings" size={24} color={dynamicStyles.headerText.color} />
                </TouchableOpacity>
            </View>

            {tasks.length === 0 && !isLoading ? (
                <View style={styles.emptyContainer}>
                    <Feather name="check-square" size={60} color={theme.secondaryText} style={{ marginBottom: 15 }} />
                    <Text style={[styles.emptyTextTitle, dynamicStyles.headerText]}>Lista Vazia</Text>
                    <Text style={[styles.emptyText, dynamicStyles.emptyText]}>
                        Comece adicionando uma nova tarefa para organizar o seu dia.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={tasks}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            <TouchableOpacity 
                style={[styles.addButton, dynamicStyles.addButton]}
                onPress={() => router.push('/add')}
            >
                <Feather name="plus" size={30} color="#FFF" />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        paddingTop: 40,
        elevation: 4,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2.84,
    },
    headerText: {
        fontSize: 28,
        fontWeight: '700',
    },
    settingsButton: {
        padding: 5,
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingBottom: 100, 
    },
    addButton: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 6,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginTop: 50,
    },
    emptyTextTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    emptyText: {
        fontSize: 16,
        textAlign: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
    },
   
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        marginVertical: 8,
        borderWidth: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 1.41,
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 3,
    },
    description: {
        fontSize: 14,
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButton: {
        marginLeft: 15,
        padding: 3,
    },
});