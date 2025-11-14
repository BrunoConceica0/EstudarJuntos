import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MessagesScreen = () => {
  const conversations = [
    { 
      id: '1', 
      name: 'Maria Silva', 
      lastMessage: 'Olá, tenho interesse no livro!', 
      time: '10:30', 
      unread: true 
    },
    { 
      id: '2', 
      name: 'João Santos', 
      lastMessage: 'O livro ainda está disponível?', 
      time: '09:15', 
      unread: false 
    },
    { 
      id: '3', 
      name: 'Ana Oliveira', 
      lastMessage: 'Podemos combinar a entrega?', 
      time: 'Ontem', 
      unread: true 
    },
  ];

  const renderConversation = ({ item }) => (
    <TouchableOpacity style={styles.conversationCard}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name.split(' ').map(n => n[0]).join('')}
        </Text>
      </View>
      <View style={styles.conversationInfo}>
        <View style={styles.conversationHeader}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text 
            style={[
              styles.lastMessage,
              item.unread && styles.unreadMessage
            ]}
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>💬 Mensagens</Text>
        <Text style={styles.subtitle}>Conversas sobre doações</Text>
      </View>

      {conversations.length > 0 ? (
        <FlatList
          data={conversations}
          renderItem={renderConversation}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="chatbubble-outline" size={64} color="#ddd" />
          <Text style={styles.emptyTitle}>Nenhuma mensagem</Text>
          <Text style={styles.emptySubtitle}>
            Suas conversas sobre doações aparecerão aqui
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
  conversationCard: {
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
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  time: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: 14,
    color: '#7f8c8d',
    flex: 1,
  },
  unreadMessage: {
    color: '#2c3e50',
    fontWeight: '500',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B35',
    marginLeft: 8,
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

export default MessagesScreen;