import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'ToDoApp',
          headerShown: false, 
        }}
      />
      
      <Stack.Screen
        name="add"
        options={{
          title: 'Adicionar nova tarefa',
          presentation: 'modal', 
        }}
      />

      <Stack.Screen
        name="settings"
        options={{
          title: 'Configurações',
        }}
      />

    </Stack>
  );
}
