// Componente reutilizável para exibir uma única tarefa na lista
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Propriedades esperadas:
// title (string): Título da tarefa
// isDone (boolean): Se a tarefa está concluída
// onToggle (function): Função para marcar/desmarcar
// onDelete (function): Função para excluir a tarefa

export default function TaskCard({ title, isDone, onToggle, onDelete }) {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.infoWrapper} onPress={onToggle}>
        {/* Círculo de Conclusão */}
        <View style={[styles.circle, isDone ? styles.circleDone : styles.circlePending]}>
          {isDone && <Text style={styles.checkIcon}>✓</Text>}
        </View>
        
        {/* Título da Tarefa */}
        <Text style={[styles.title, isDone && styles.titleDone]}>
          {title}
        </Text>
      </TouchableOpacity>
      
      {/* Botão de Excluir */}
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  infoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  circlePending: {
    borderColor: '#BDBDBD', // Cinza para pendente
  },
  circleDone: {
    borderColor: '#4CAF50', // Verde para concluído
    backgroundColor: '#4CAF50',
  },
  checkIcon: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 16,
    color: '#424242',
  },
  titleDone: {
    textDecorationLine: 'line-through',
    color: '#757575',
  },
  deleteButton: {
    padding: 5,
    marginLeft: 10,
  },
  deleteIcon: {
    fontSize: 20,
    color: '#FF6347', // Laranja/Vermelho suave para ação de exclusão
  }
});
