// Register.tsx

import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import UserRegistrationForm from "@/components/forms/UserRegistrationFormStep1";
import UserRegistrationFormStep2 from "@/components/forms/UserRegistrationFormStep2";
import UserRegistrationFormStep2Donor from "@/components/forms/UserRegistrationFormStep2Donor";
import UserTypeSelection from "@/components/forms/UserTypeSelection";
import ModalRegisterSuccess from "@/components/forms/ModalRegisterSuccess";
import ModalRegisterSuccessDonor from "@/components/forms/ModalRegisterSuccessDonor";
import { typography } from "@/style";
import { useState } from "react";
import {
  IStep1Data,
  IFullRegistrationData,
} from "@/interfaces/IUserRegistrationFormProps";
import { IFullDonorRegistrationData } from "@/components/forms/UserRegistrationFormStep2Donor";
import { useAuth } from "@/contexts/AuthContext";

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useAuth();

  // Estados do fluxo
  const [step, setStep] = useState(1); // 1: dados pessoais, 1.5: escolha tipo, 2: perfil
  const [userType, setUserType] = useState<"student" | "donor" | null>(null);
  const [step1Data, setStep1Data] = useState<IStep1Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userName, setUserName] = useState("");

  // Função chamada pelo UserRegistrationForm.tsx (Etapa 1)
  const handleStep1Complete = (data: IStep1Data) => {
    setStep1Data(data);
    setStep(1.5); // Vai para seleção de tipo de usuário
  };

  // Função chamada pela seleção de tipo de usuário
  const handleUserTypeSelect = (type: "student" | "donor") => {
    setUserType(type);
    setStep(2); // Vai para etapa de perfil
  };

  // Função chamada pelo Step2 do Estudante
  const handleStudentSubmit = async (data: IFullRegistrationData) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password, {
        name: data.name,
        birthDate: data.birthDate,
        cep: data.cep,
        state: data.state,
        city: data.city,
        subjects: data.subjects,
        goals: data.goals,
        userType: "student",
      });

      setUserName(data.name);
      setShowSuccessModal(true);
    } catch (error: any) {
      Alert.alert(
        "Erro ao criar conta",
        error.message || "Tente novamente mais tarde"
      );
    } finally {
      setLoading(false);
    }
  };

  // Função chamada pelo Step2 do Doador
  const handleDonorSubmit = async (data: IFullDonorRegistrationData) => {
    setLoading(true);
    try {
      await signUp(data.email, data.password, {
        name: data.name,
        birthDate: data.birthDate,
        cep: data.cep,
        address: data.address,
        donorType: data.donorType,
        deliveryPreference: data.deliveryPreference,
        bookTypes: data.bookTypes,
        userType: "donor",
      });

      setUserName(data.name);
      setShowSuccessModal(true);
    } catch (error: any) {
      Alert.alert(
        "Erro ao criar conta",
        error.message || "Tente novamente mais tarde"
      );
    } finally {
      setLoading(false);
    }
  };

  // Função chamada quando o modal de sucesso é fechado
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    router.replace("/(tabs)/Home");
  };

  // Função para lidar com o botão 'Voltar'
  const handleBack = () => {
    if (step === 2) {
      setStep(1.5); // Volta para seleção de tipo
    } else if (step === 1.5) {
      setStep(1); // Volta para dados pessoais
    } else {
      router.back(); // Volta para a tela anterior
    }
  };

  // Definir título do header baseado na etapa
  const getHeaderTitle = () => {
    if (step === 1) return "Preencha seus dados";
    if (step === 1.5) return "Escolha seu perfil";
    if (step === 2 && userType === "student") return "Complete seu perfil";
    if (step === 2 && userType === "donor") return "Configure seu perfil de doador";
    return "";
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <View style={styles.container}>
        {step !== 1.5 && (
          <View style={styles.header}>
            <Pressable onPress={handleBack}>
              <Text style={styles.backButton}>← Voltar</Text>
            </Pressable>
            <Text style={[typography.textXl, styles.subtitle]}>
              {getHeaderTitle()}
            </Text>
          </View>
        )}

        {/* Etapa 1: Dados Pessoais */}
        {step === 1 && (
          <UserRegistrationForm
            onNext={handleStep1Complete}
            onSubmit={() => {}} // Não usado neste fluxo
          />
        )}

        {/* Etapa 1.5: Seleção de Tipo de Usuário */}
        {step === 1.5 && (
          <UserTypeSelection onSelect={handleUserTypeSelect} />
        )}

        {/* Etapa 2: Perfil do Estudante */}
        {step === 2 && userType === "student" && step1Data && (
          <UserRegistrationFormStep2
            initialData={step1Data}
            onSubmit={handleStudentSubmit}
          />
        )}

        {/* Etapa 2: Perfil do Doador */}
        {step === 2 && userType === "donor" && step1Data && (
          <UserRegistrationFormStep2Donor
            initialData={step1Data}
            onSubmit={handleDonorSubmit}
          />
        )}

        {step !== 1.5 && (
          <View style={styles.footer}>
            <Text style={typography.textXm}>Já tem conta? </Text>
            <Pressable onPress={() => router.push("/auth/login")}>
              <Text style={[typography.textXm, typography.textXlB]}>Entrar</Text>
            </Pressable>
          </View>
        )}
      </View>

      {/* Modais de Sucesso */}
      {userType === "student" && (
        <ModalRegisterSuccess
          visible={showSuccessModal}
          onClose={handleCloseSuccessModal}
          name={userName}
        />
      )}

      {userType === "donor" && (
        <ModalRegisterSuccessDonor
          visible={showSuccessModal}
          onClose={handleCloseSuccessModal}
          name={userName}
        />
      )}
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
