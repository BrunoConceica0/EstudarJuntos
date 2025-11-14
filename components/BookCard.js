import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const BookCard = ({ book, onPress, onEdit, onDelete }) => {
  const getConditionStyle = (condition) => {
    return condition.replace(/\s+/g, '').replace('-', '');
  };

  const handleDelete = () => {
    Alert.alert(
      "Excluir Livro",
      `Tem certeza que deseja excluir "${book.title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: onDelete }
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.cardContent}>
        
        <View style={styles.cardHeader}>
          <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
        </View>

        <Text style={styles.bookAuthor}>por {book.author}</Text>
        
        <View style={styles.conditionContainer}>
          <Text style={[styles.condition, styles[getConditionStyle(book.condition)]]}>
            {book.condition}
          </Text>
        </View>

        {book.description && (
          <Text style={styles.description} numberOfLines={3}>
            {book.description}
          </Text>
        )}

        
        <View style={styles.cardFooter}>
          <Text style={styles.date}>{book.date}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => onEdit(book)} style={styles.actionButton}>
              <Ionicons name="create-outline" size={20} color="#4CAF50" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
              <Ionicons name="trash-outline" size={20} color="#FF6B35" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    lineHeight: 24,
  },
  bookAuthor: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  conditionContainer: {
    marginBottom: 12,
  },
  condition: {
    fontSize: 13,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  Novo: {
    backgroundColor: '#27ae60',
    color: 'white',
  },
  UsadoÓtimo: {
    backgroundColor: '#2ecc71',
    color: 'white',
  },
  UsadoBom: {
    backgroundColor: '#f39c12',
    color: 'white',
  },
  UsadoRegular: {
    backgroundColor: '#e74c3c',
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 12,
  },
  date: {
    fontSize: 12,
    color: '#95a5a6',
    fontWeight: '500',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 6,
    marginLeft: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
});

export default BookCard;