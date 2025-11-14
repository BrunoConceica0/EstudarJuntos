import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FavoritesScreen = () => {
  const favoriteBooks = [
    { id: '1', title: 'Harry Potter e a Pedra Filosofal', author: 'J.K. Rowling', condition: 'Novo' },
    { id: '2', title: 'O Pequeno Príncipe', author: 'Antoine de Saint-Exupéry', condition: 'Usado - Ótimo' },
    { id: '3', title: '1984', author: 'George Orwell', condition: 'Usado - Bom' },
  ];

  const renderBookItem = ({ item }) => (
    <View style={styles.bookCard}>
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle}>{item.title}</Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <Text style={styles.bookCondition}>{item.condition}</Text>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="heart" size={20} color="#FF6B35" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>❤️ Meus Favoritos</Text>
        <Text style={styles.subtitle}>Livros que você salvou para depois</Text>
      </View>

      {favoriteBooks.length > 0 ? (
        <FlatList
          data={favoriteBooks}
          renderItem={renderBookItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={64} color="#ddd" />
          <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
          <Text style={styles.emptySubtitle}>
            Toque no coração nos livros para adicionar aos favoritos
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 25,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginTop: 5,
  },
  listContent: {
    padding: 20,
  },
  bookCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  bookCondition: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  removeButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default FavoritesScreen;