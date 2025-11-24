import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const ProfileScreen = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation();
  const router = useRouter();

  // Funções para os botões
  const handleEditProfile = () => {
    Alert.alert("Editar Perfil", "Funcionalidade em desenvolvimento");
    // navigation.navigate("EditProfile");
  };

  const handleMyBooks = () => {
    Alert.alert("Meus Livros", "Funcionalidade em desenvolvimento");
    // navigation.navigate("MyBooks");
  };

  const handleFavorites = () => {
    Alert.alert("Favoritos", "Funcionalidade em desenvolvimento");
    // navigation.navigate("Favorites");
  };

  const handleNotifications = () => {
    Alert.alert("Notificações", "Funcionalidade em desenvolvimento");
    // navigation.navigate("Notifications");
  };

  const handlePrivacy = () => {
    Alert.alert("Privacidade", "Funcionalidade em desenvolvimento");
    // navigation.navigate("Privacy");
  };

  const handleHelp = () => {
    Alert.alert("Ajuda & Suporte", "Funcionalidade em desenvolvimento");
    // navigation.navigate("Help");
  };

  const handleDonateBook = () => {
    Alert.alert("Doar Livro", "Funcionalidade em desenvolvimento");
    // navigation.navigate("BookDonation");
  };

  const handleLogout = async () => {
    // No web, Alert.alert não funciona, então usamos window.confirm
    if (Platform.OS === 'web') {
      const confirmed = window.confirm("Tem certeza que deseja sair?");
      if (confirmed) {
        try {
          await signOut();
          router.replace("/auth/login");
        } catch (error) {
          window.alert("Erro: Não foi possível sair da conta");
        }
      }
    } else {
      // No mobile (Android/iOS), usamos Alert.alert
      Alert.alert(
        "Sair da Conta",
        "Tem certeza que deseja sair?",
        [
          {
            text: "Cancelar",
            style: "cancel",
          },
          {
            text: "Sair",
            style: "destructive",
            onPress: async () => {
              try {
                await signOut();
                router.replace("/auth/login");
              } catch (error) {
                Alert.alert("Erro", "Não foi possível sair da conta");
              }
            },
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>

        <Text style={styles.userName}>{user?.name || "Usuário"}</Text>
        <Text style={styles.userEmail}>
          {user?.email || "email@exemplo.com"}
        </Text>

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user?.booksDonated || 0}</Text>
            <Text style={styles.statLabel}>Livros Doados</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>{user?.booksReceived || 0}</Text>
            <Text style={styles.statLabel}>Livros Recebidos</Text>
          </View>
        </View>
      </View>

      {/* MENU */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Minha Conta</Text>

          <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
            <Ionicons name="person-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Editar Perfil</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleMyBooks}>
            <Ionicons name="book-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Meus Livros</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleFavorites}>
            <Ionicons name="heart-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Favoritos</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Configurações</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleNotifications}
          >
            <Ionicons name="notifications-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Notificações</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handlePrivacy}>
            <Ionicons name="lock-closed-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Privacidade</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleHelp}>
            <Ionicons name="help-circle-outline" size={22} color="#666" />
            <Text style={styles.menuText}>Ajuda & Suporte</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Doar Livro */}
        <TouchableOpacity
          style={styles.donateButton}
          onPress={handleDonateBook}
        >
          <Ionicons name="book" size={20} color="white" />
          <Text style={styles.donateButtonText}>Doar um Livro</Text>
        </TouchableOpacity>

        {/* Botão de Logout */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#dc3545" />
          <Text style={styles.logoutButtonText}>Sair da Conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  profileHeader: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
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
    color: "#007bff",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuSection: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  donateButton: {
    backgroundColor: "#007bff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 30,
    shadowColor: "#007bff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  donateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  logoutButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#dc3545",
  },
  logoutButtonText: {
    color: "#dc3545",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default ProfileScreen;
