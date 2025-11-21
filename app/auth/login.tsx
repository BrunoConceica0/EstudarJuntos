import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import Input from "@/components/common/Input";
import Btn from "@/components/common/Buttom";
import { typography } from "@/style";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Login:", { email, password });
    router.replace("/tabs/Home");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={styles.backButton}>← Voltar</Text>
          </Pressable>
          <Text style={[typography.title, styles.titleSpacing]}>Entrar</Text>
          <Text style={[typography.textXl, styles.subtitle]}>
            Bem-vindo de volta!
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="E-mail"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Senha"
            placeholder="Digite sua senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Pressable style={styles.forgotPassword}>
            <Text style={[typography.textXm, styles.forgotPasswordText]}>
              Esqueceu a senha?
            </Text>
          </Pressable>

          <Btn title="Entrar" onPress={handleLogin} />
        </View>

        <View style={styles.footer}>
          <Text style={typography.textXm}>Não tem conta? </Text>
          <Pressable onPress={() => router.push("/auth/Register")}>
            <Text style={[typography.textXm, typography.textXlB]}>
              Cadastre-se
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  header: {
    marginTop: 20,
    marginBottom: 40,
  },
  backButton: {
    fontSize: 16,
    color: "#3A7DFF",
    marginBottom: 20,
  },
  titleSpacing: {
    marginBottom: 8,
  },
  subtitle: {
    color: "#666",
  },
  form: {
    flex: 1,
    minHeight: 300,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
    marginTop: -8,
  },
  forgotPasswordText: {
    color: "#3A7DFF",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
    marginTop: 20,
  },
});
