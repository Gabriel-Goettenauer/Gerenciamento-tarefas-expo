import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getTaskById, saveTask, updateExistingTask } from '../utils/TaskStorage';
import { Feather } from '@expo/vector-icons';
import { useTheme } from './ThemeContext';

const CustomButton = ({ title, onPress, iconName, style }) => {
    const { theme } = useTheme();

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.button,
                { backgroundColor: theme.primaryButton },
                style,
            ]}
        >
            {iconName && (
                <Feather name={iconName} size={20} color='#FFF' style={styles.buttonIcon} />
            )}
            <Text style={[styles.buttonText, { color: '#FFF' }]}>{title}</Text>
        </TouchableOpacity>
    );
};

export default function AddTaskScreen() {
    const { theme } = useTheme();
    const params = useLocalSearchParams();
    const isEditMode = !!params.id; 

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(''); 

    const dynamicStyles = StyleSheet.create({
        container: {
            backgroundColor: theme.background,
        },
        headerText: {
            color: theme.text,
        },
        input: {
            color: theme.text,
            backgroundColor: theme.cardBackground, 
            borderColor: theme.secondaryText,
        },
        label: {
            color: theme.text,
        },
        errorText: {
            color: theme.danger,
        },
    });

    useEffect(() => {
        const loadData = async () => {
            if (isEditMode) {
                const task = await getTaskById(params.id); 
                if (task) {
                    setTitulo(task.titulo);
                    setDescricao(task.descricao);
                } else {
                    Alert.alert('Erro', 'Tarefa não encontrada!');
                    router.back();
                }
            }
            setIsLoading(false);
        };
        loadData();
    }, [params.id]);

    const handleSaveTask = async () => {
        setError(''); 

        if (titulo.trim() === '') {
            setError('Preencha o campo Título corretamente.'); 
            return;
        }

        const taskData = {
            titulo: titulo.trim(),
            descricao: descricao.trim(),
        };

        try {
            if (isEditMode) {
                await updateExistingTask(params.id, taskData);
                Alert.alert('Sucesso', 'Tarefa atualizada com sucesso!');
            } else {
                await saveTask(taskData); 
                Alert.alert('Sucesso', 'Tarefa adicionada com sucesso!');
            }
            router.back();

        } catch (e) {
            console.error('Erro ao salvar/atualizar tarefa:', e);
            Alert.alert('Erro', 'Não foi possível salvar a tarefa. Tente novamente.');
        }
    };

    if (isLoading) {
        return (
            <View style={[styles.loadingContainer, dynamicStyles.container]}>
                <ActivityIndicator size="large" color={theme.primaryButton} />
                <Text style={dynamicStyles.headerText}>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, dynamicStyles.container]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Feather name='arrow-left' size={24} color={dynamicStyles.headerText.color} />
                </TouchableOpacity>
                <Text style={[styles.headerText, dynamicStyles.headerText]}>
                    {isEditMode ? 'Editar Tarefa' : 'Nova Tarefa'}
                </Text>
            </View>

            <ScrollView style={styles.scrollView}>
                {error ? (
                    <View style={styles.errorContainer}>
                        <Feather name="alert-triangle" size={18} color={dynamicStyles.errorText.color} style={{ marginRight: 8 }} />
                        <Text style={[styles.errorText, dynamicStyles.errorText]}>{error}</Text>
                    </View>
                ) : null}

                <Text style={[styles.label, dynamicStyles.label]}>Título</Text>
                <TextInput
                    style={[styles.input, dynamicStyles.input, error && styles.inputErrorBorder]}
                    placeholder="Ex: Comprar pão e leite"
                    placeholderTextColor={theme.secondaryText}
                    value={titulo}
                    onChangeText={(text) => { setTitulo(text); setError(''); }} 
                    maxLength={100}
                />
                
                <Text style={[styles.label, dynamicStyles.label, { marginTop: 20 }]}>Descrição (Opcional)</Text>
                <TextInput
                    style={[styles.input, dynamicStyles.input, styles.multilineInput]}
                    placeholder="Detalhes adicionais sobre a tarefa..."
                    placeholderTextColor={theme.secondaryText}
                    value={descricao}
                    onChangeText={setDescricao}
                    multiline
                    numberOfLines={4}
                    maxLength={500}
                />
            </ScrollView>

            <View style={styles.footer}>
                <CustomButton
                    title={isEditMode ? 'Atualizar Tarefa' : 'Salvar Tarefa'}
                    onPress={handleSaveTask}
                    iconName={isEditMode ? 'save' : 'plus-circle'}
                />
            </View>
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
    scrollView: {
        padding: 20,
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        paddingTop: 40,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2.84,
        marginBottom: 10,
    },
    backButton: {
        paddingRight: 15,
    },
    headerText: {
        fontSize: 22,
        fontWeight: '600',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    multilineInput: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    inputErrorBorder: {
        borderColor: '#EF4444', 
        borderWidth: 2,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(239, 68, 68, 0.1)', 
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    errorText: {
        fontSize: 14,
        fontWeight: '500',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonIcon: {
        marginRight: 8,
    },
});