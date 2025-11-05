import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TaskCard({ title, isDone, onToggle, onDelete }) {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.infoWrapper} onPress={onToggle}>
        <View style={[styles.circle, isDone ? styles.circleDone : styles.circlePending]}>
          {isDone && <Text style={styles.checkIcon}>✓</Text>}
        </View>
        
        <Text style={[styles.title, isDone && styles.titleDone]}>
          {title}
        </Text>
      </TouchableOpacity>
      
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
    borderColor: '#BDBDBD', 
  },
  circleDone: {
    borderColor: '#4CAF50', 
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
    color: '#FF6347',
  }
});
