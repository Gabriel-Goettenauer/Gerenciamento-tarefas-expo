// Este arquivo configura as opções de navegação (cabeçalhos) para todo o app.
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    // Stack Navigator para navegação linear
    <Stack>
      {/* Opções específicas para a Tela Principal (index) */}
      <Stack.Screen
        name="index"
        options={{
          title: 'ToDoApp',
          headerShown: false, // Esconde o cabeçalho padrão, pois usaremos um personalizado na tela
        }}
      />
      
      {/* Opções específicas para a Tela de Adicionar Tarefa (add) */}
      <Stack.Screen
        name="add"
        options={{
          title: 'Adicionar nova tarefa',
          presentation: 'modal', // Faz a tela subir como um modal
        }}
      />

      {/* Opções específicas para a Tela de Configurações (settings) */}
      <Stack.Screen
        name="settings"
        options={{
          title: 'Configurações',
        }}
      />

      {/* REMOVIDO: A rota "detailed" foi removida para eliminar o aviso, 
        já que o arquivo correspondente não foi criado.
      */}
    </Stack>
  );
}
