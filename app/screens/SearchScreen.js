import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = () => {
    const exampleBooks = [
      { id: '1', title: 'Harry Potter', author: 'J.K. Rowling', condition: 'Novo' },
      { id: '2', title: 'O Senhor dos Anéis', author: 'J.R.R. Tolkien', condition: 'Usado - Bom' },
    ];
    setBooks(exampleBooks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔍 Buscar Livros</Text>
        <Text style={styles.subtitle}>Encontre livros disponíveis para doação</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Digite título, autor ou gênero..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={books}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.title}</Text>
            <Text style={styles.bookAuthor}>{item.author}</Text>
            <Text style={styles.bookCondition}>{item.condition}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchText ? 'Nenhum livro encontrado' : 'Digite algo para buscar'}
          </Text>
        }
      />
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
  searchContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  searchButton: {
    backgroundColor: '#FF6B35',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookItem: {
    backgroundColor: 'white',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#666',
  },
  bookCondition: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
});

export default SearchScreen;