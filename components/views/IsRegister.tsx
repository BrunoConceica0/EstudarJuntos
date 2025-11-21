import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Btn from "@/components/common/Buttom";

export default function WelcomeScreen() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/auth/login");
  };

  const handleRegister = () => {
    router.replace("/tabs/Home");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.content}>
        {/* Logo ou Ilustração */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>📚</Text>
          <Text style={styles.appName}>EstudarJuntos</Text>
          <Text style={styles.tagline}>
            A Ponte do Saber conecta você ao seu futuro
          </Text>
        </View>

        {/* Pergunta */}
        <View style={styles.questionContainer}>
          <Text style={styles.question}>Você já tem cadastro?</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Btn title="Sim, já tenho conta" onPress={handleLogin} />

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.secondaryButton}>
            <Btn title="Não, quero me cadastrar" onPress={handleRegister} />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Ao continuar, você concorda com nossos{" "}
          <Text style={styles.footerLink}>Termos de Uso</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  logoEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  questionContainer: {
    marginBottom: 32,
  },
  question: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 12,
    color: "#999",
    fontSize: 14,
  },
  secondaryButton: {
    opacity: 0.9,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
  footerLink: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
