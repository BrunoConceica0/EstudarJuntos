import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Btn from "@/components/common/Buttom";
import { typography, cores } from "@/style";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.container, cores.bg]} edges={["top"]}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoEmoji}>📚</Text>
          <Text style={typography.title}>EstudarJuntos</Text>
          <Text style={[typography.textXl, styles.tagline]}>
            A Ponte do Saber conecta você ao seu futuro
          </Text>
        </View>

        <View style={styles.questionContainer}>
          <Text style={[typography.subtitle, styles.question]}>
            Você já tem cadastro?
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Btn
            title="Sim, já tenho conta"
            onPress={() => router.push("/auth/login")}
          />

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={typography.textXm}>ou</Text>
            <View style={styles.divider} />
          </View>

          <Btn
            title="Não, quero me cadastrar"
            onPress={() => router.push("/auth/Register")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  tagline: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 8,
  },
  questionContainer: {
    marginBottom: 32,
  },
  question: {
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
});
