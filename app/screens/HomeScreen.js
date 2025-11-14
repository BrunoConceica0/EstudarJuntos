import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Bem-vindo! 👋</Text>
        <Text style={styles.subtitle}>O que você gostaria de fazer hoje?</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        
        <TouchableOpacity 
          style={[styles.card, styles.donateCard]}
          onPress={() => navigation.navigate('BookDonation')}
        >
          <View style={styles.cardIcon}>
            <Ionicons name="book-outline" size={32} color="#4CAF50" />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Doar Livros</Text>
            <Text style={styles.cardDescription}>
              Compartilhe livros que você já leu e ajude outras pessoas
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#999" />
        </TouchableOpacity>

        <View style={styles.optionsGrid}>
          
          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('Search')}
          >
            <View style={[styles.optionIcon, { backgroundColor: '#FF6B35' }]}>
              <Ionicons name="search" size={24} color="white" />
            </View>
            <Text style={styles.optionText}>Buscar Livros</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('Favorites')}
          >
            <View style={[styles.optionIcon, { backgroundColor: '#2196F3' }]}>
              <Ionicons name="heart" size={24} color="white" />
            </View>
            <Text style={styles.optionText}>Meus Favoritos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('Profile')}
          >
            <View style={[styles.optionIcon, { backgroundColor: '#9C27B0' }]}>
              <Ionicons name="person" size={24} color="white" />
            </View>
            <Text style={styles.optionText}>Meu Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionCard}
            onPress={() => navigation.navigate('Messages')}
          >
            <View style={[styles.optionIcon, { backgroundColor: '#FF9800' }]}>
              <Ionicons name="chatbubbles" size={24} color="white" />
            </View>
            <Text style={styles.optionText}>Mensagens</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>📊 Estatísticas da Comunidade</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>1.247</Text>
              <Text style={styles.statLabel}>Livros Doados</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>893</Text>
              <Text style={styles.statLabel}>Leitores Beneficiados</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>56</Text>
              <Text style={styles.statLabel}>Cidades Atendidas</Text>
            </View>
          </View>
        </View>

      </ScrollView>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  donateCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  cardIcon: {
    marginRight: 15,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionCard: {
    backgroundColor: 'white',
    width: '48%',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  optionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default HomeScreen;