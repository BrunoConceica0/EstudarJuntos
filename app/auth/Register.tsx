// Register.tsx

import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import UserRegistrationForm from "@/components/forms/UserRegistrationFormStep1";
import UserRegistrationFormStep2 from "@/components/forms/UserRegistrationFormStep2"; // Componente da Etapa 2
import { typography } from "@/style";
import { useState } from "react";
// Importa as tipagens para o estado
import {
  IStep1Data,
  IFullRegistrationData,
} from "@/interfaces/IUserRegistrationFormProps";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [step, setStep] = useState(1); // 1: Etapa 1 (pessoal), 2: Etapa 2 (perfil)
  const [step1Data, setStep1Data] = useState<IStep1Data | null>(null);
  const [loading, setLoading] = useState(false);

  // Função chamada pelo UserRegistrationForm.tsx (Etapa 1)
  const handleNext = (data: IStep1Data) => {
    setStep1Data(data);
    setStep(2); // Avança para a Etapa 2
  };

  // Função chamada pelo UserRegistrationFormStep2.tsx (Etapa 2)
  const handleSubmit = async (data: IFullRegistrationData) => {
    setLoading(true);
    try {
      // Criar conta no Firebase com todos os dados
      await signUp(data.email, data.password, {
        name: data.name,
        birthDate: data.birthDate,
        cep: data.cep,
        state: data.state,
        city: data.city,
        subjects: data.subjects,
        goals: data.goals,
      });

      Alert.alert("Sucesso!", "Conta criada com sucesso!");
      router.replace("/(tabs)/Home");
    } catch (error: any) {
      Alert.alert(
        "Erro ao criar conta",
        error.message || "Tente novamente mais tarde"
      );
    } finally {
      setLoading(false);
    }
  };

  // Função para lidar com o botão 'Voltar'
  const handleBack = () => {
    if (step === 2) {
      setStep(1); // Volta para a Etapa 1
    } else {
      router.back(); // Volta para a tela anterior
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={handleBack}>
            <Text style={styles.backButton}>← Voltar</Text>
          </Pressable>
          <Text style={[typography.textXl, styles.subtitle]}>
            {step === 1 ? "Preencha seus dados" : "Complete seu perfil"}
          </Text>
        </View>

        {/* Renderização Condicional */}
        {step === 1 && (
          <UserRegistrationForm
            onNext={handleNext}
            onSubmit={handleSubmit} // Apenas para cumprir o contrato da interface
          />
        )}

        {step === 2 && step1Data && (
          <UserRegistrationFormStep2
            initialData={step1Data}
            onSubmit={handleSubmit}
          />
        )}

        <View style={styles.footer}>
          <Text style={typography.textXm}>Já tem conta? </Text>
          <Pressable onPress={() => router.push("/auth/login")}>
            <Text style={[typography.textXm, typography.textXlB]}>Entrar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
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
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 20,
    paddingBottom: 30,
  },
});
