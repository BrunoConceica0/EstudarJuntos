import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { cores, typography, utility } from "@/style/index";

const BookIconSource = require("@/assets/image/livro_transparente.png");

// Componente separado para o card de boas-vindas
const WelcomeCard = ({ userName }) => (
  <View style={styles.topWelcomeCard}>
    <Text style={[typography.subtitle, styles.welcomeTitle]}>
      Seja bem-vindo(a), {userName}! 🎉
    </Text>
    <Text style={[typography.textXm, styles.welcomeSubtitle]}>
      A Ponte do Saber conecta você ao seu futuro. Explore doações ou
      compartilhe seus livros para começar.
    </Text>
  </View>
);

// Componente separado para o estado vazio
const EmptyState = () => (
  <View style={styles.noBooksContainer}>
    <Image source={BookIconSource} style={styles.bookIcon} />
    <Text style={[typography.subtitle, styles.emptyTitle]}>
      Nenhum livro próximo ainda
    </Text>
    <Text style={[typography.textXl, styles.emptySubtitle]}>
      Os livros que aparecerem perto de você serão listados aqui
    </Text>
  </View>
);

// Componente do FAB (Floating Action Button)
const FloatingActionButton = ({ onPress }) => (
  <TouchableOpacity
    style={[styles.fabButton, cores.primary]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Text style={[cores.btnText, styles.fabText]}>+</Text>
  </TouchableOpacity>
);

// Componente principal
const HomeScreen = () => {
  const router = useRouter();
  const userName = "Maria";

  const handleFabPress = () => {
    router.push("/Explore");
  };

  return (
    <View style={[utility.main, styles.androidSafeArea, cores.bg]}>
      <ScrollView style={utility.main}>
        <WelcomeCard userName={userName} />
        <EmptyState />
      </ScrollView>

      <FloatingActionButton onPress={handleFabPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  androidSafeArea: {
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    width: "90%",
  },

  // Card de boas-vindas
  topWelcomeCard: {
    backgroundColor: "#007AFF",
    padding: 20,
    paddingTop: 40,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  welcomeTitle: {
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  welcomeSubtitle: {
    color: "#FFFFFF",
    lineHeight: 22,
    textAlign: "center",
    paddingBottom: 50,
  },

  // Estado vazio
  noBooksContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: 200,
  },
  bookIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    opacity: 0.9,
  },
  emptyTitle: {
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  emptySubtitle: {
    textAlign: "center",
    lineHeight: 22,
  },

  // FAB
  fabButton: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    left: "50%",
    marginLeft: -30,
    bottom: 50,
    borderRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    fontSize: 35,
    lineHeight: 35,
  },
});

export default HomeScreen;
