// Tela para adicionar uma nova tarefa
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Stack, router } from 'expo-router';
// Importa o componente personalizado CustomButton
import CustomButton from '../components/CustomButton'; 

export default function AddTaskScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: 'Adicionar nova tarefa',
        }}
      />
      
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Escreva uma tarefa..."
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Escreva detalhes sobre a tarefa"
        multiline
      />

      {/* Usando o componente CustomButton */}
      <CustomButton
        title="Salvar"
        onPress={() => {
          console.log('Tarefa salva! Voltando para a tela principal...');
          router.back();
        }}
        style={styles.saveButtonPosition}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 5,
    color: '#424242',
  },
  input: {
    backgroundColor: '#F5F5F5', 
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#424242',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top', 
  },
  saveButtonPosition: {
    marginTop: 30,
  }
});
