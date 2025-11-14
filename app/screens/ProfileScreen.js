import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // ✅ Usar Expo Router

const ProfileScreen = () => {
  const router = useRouter(); // ✅ Hook do Expo Router

  return (
    <View style={styles.container}>
      {/* Perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>U</Text>
        </View>
        <Text style={styles.userName}>Usuário</Text>
        <Text style={styles.userEmail}>usuario@email.com</Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Livros Doados</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Livros Recebidos</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Menu de Opções */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Minha Conta</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="person-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Editar Perfil</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="book-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Meus Livros</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="heart-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Favoritos</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Configurações</Text>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Notificações</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="lock-closed-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Privacidade</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Ionicons name="help-circle-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Ajuda & Suporte</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Botão de Doação */}
        <TouchableOpacity
          style={styles.donateButton}
          onPress={() => router.push("/(tabs)/Create")} // ✅ Navegar para aba Create
        >
          <Ionicons name="book" size={20} color="white" />
          <Text style={styles.donateButtonText}>Doar um Livro</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

// ... resto dos estilos (manter igual)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  profileHeader: {
    backgroundColor: "#4CAF50",
    padding: 30,
    paddingTop: 60,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
    marginBottom: 20,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  stat: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "white",
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  menuSection: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 15,
    marginLeft: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 15,
  },
  donateButton: {
    backgroundColor: "#FF6B35",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
    borderRadius: 12,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  donateButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ProfileScreen;
