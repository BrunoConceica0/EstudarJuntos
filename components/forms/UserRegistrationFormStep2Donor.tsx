import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { useState } from "react";
import Input from "@/components/common/Input";
import Btn from "@/components/common/Buttom";
import { typography } from "@/style";
import { IStep1Data } from "@/interfaces/IUserRegistrationFormProps";

interface IStep2DonorData {
  cep: string;
  address: string;
  donorType: "individual" | "institution";
  cpf?: string; // Para pessoa física
  cnpj?: string; // Para pessoa jurídica
  companyName?: string; // Razão social para pessoa jurídica
  deliveryPreference: "pickup" | "meetup" | "both";
  bookTypes: string[];
}

export interface IFullDonorRegistrationData extends IStep1Data, IStep2DonorData {}

interface UserRegistrationFormStep2DonorProps {
  initialData: IStep1Data;
  onSubmit: (data: IFullDonorRegistrationData) => void;
}

const UserRegistrationFormStep2Donor = ({
  initialData,
  onSubmit,
}: UserRegistrationFormStep2DonorProps) => {
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [donorType, setDonorType] = useState<"individual" | "institution">("individual");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [deliveryPreference, setDeliveryPreference] = useState<"pickup" | "meetup" | "both">("pickup");
  const [selectedBookTypes, setSelectedBookTypes] = useState<string[]>([]);

  const bookTypesOptions = [
    { id: "didaticos", label: "Didáticos" },
    { id: "literatura", label: "Literatura" },
    { id: "pre-vestibular", label: "Pré-vestibular" },
    { id: "apostilas", label: "Apostilas" },
    { id: "exercicios", label: "Exercícios" },
  ];

  const toggleBookType = (bookType: string) => {
    if (selectedBookTypes.includes(bookType)) {
      setSelectedBookTypes(selectedBookTypes.filter((t) => t !== bookType));
    } else {
      setSelectedBookTypes([...selectedBookTypes, bookType]);
    }
  };

  const handleSubmit = () => {
    const fullData: IFullDonorRegistrationData = {
      ...initialData,
      cep,
      address,
      donorType,
      cpf: donorType === "individual" ? cpf : undefined,
      cnpj: donorType === "institution" ? cnpj : undefined,
      companyName: donorType === "institution" ? companyName : undefined,
      deliveryPreference,
      bookTypes: selectedBookTypes,
    };
    onSubmit(fullData);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[typography.title, styles.sectionTitle]}>
        Configure seu perfil de doador
      </Text>

      {/* CEP */}
      <Input
        label="CEP"
        placeholder="00000-000"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        maxLength={9}
      />

      {/* Endereço */}
      <Input
        label="Endereço"
        placeholder="Rua, número, bairro"
        value={address}
        onChangeText={setAddress}
        multiline
      />

      {/* Tipo de Doador */}
      <View style={styles.section}>
        <Text style={[typography.textXm, styles.label]}>Tipo de Doador</Text>
        <View style={styles.radioGroup}>
          <Pressable
            style={[
              styles.radioOption,
              donorType === "individual" && styles.radioOptionSelected,
            ]}
            onPress={() => setDonorType("individual")}
          >
            <Text
              style={[
                typography.textXm,
                donorType === "individual" && styles.radioTextSelected,
              ]}
            >
              Pessoa Física
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.radioOption,
              donorType === "institution" && styles.radioOptionSelected,
            ]}
            onPress={() => setDonorType("institution")}
          >
            <Text
              style={[
                typography.textXm,
                donorType === "institution" && styles.radioTextSelected,
              ]}
            >
              Pessoa Jurídica
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Campos específicos para Pessoa Física */}
      {donorType === "individual" && (
        <Input
          label="CPF"
          placeholder="000.000.000-00"
          value={cpf}
          onChangeText={setCpf}
          keyboardType="numeric"
          maxLength={14}
        />
      )}

      {/* Campos específicos para Pessoa Jurídica */}
      {donorType === "institution" && (
        <>
          <Input
            label="CNPJ"
            placeholder="00.000.000/0000-00"
            value={cnpj}
            onChangeText={setCnpj}
            keyboardType="numeric"
            maxLength={18}
          />
          <Input
            label="Razão Social"
            placeholder="Nome da empresa"
            value={companyName}
            onChangeText={setCompanyName}
          />
        </>
      )}

      {/* Preferências de Entrega */}
      <View style={styles.section}>
        <Text style={[typography.textXm, styles.label]}>
          Preferências de Entrega
        </Text>

        <Pressable
          style={[
            styles.deliveryOption,
            deliveryPreference === "pickup" && styles.deliveryOptionSelected,
          ]}
          onPress={() => setDeliveryPreference("pickup")}
        >
          <View style={styles.radioCircle}>
            {deliveryPreference === "pickup" && (
              <View style={styles.radioCircleSelected} />
            )}
          </View>
          <View style={styles.deliveryTextContainer}>
            <Text style={[typography.textXm, typography.textXlB]}>
              Retirada no meu endereço
            </Text>
            <Text style={[typography.textXs, styles.deliverySubtext]}>
              O estudante pode buscar no local indicado
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={[
            styles.deliveryOption,
            deliveryPreference === "meetup" && styles.deliveryOptionSelected,
          ]}
          onPress={() => setDeliveryPreference("meetup")}
        >
          <View style={styles.radioCircle}>
            {deliveryPreference === "meetup" && (
              <View style={styles.radioCircleSelected} />
            )}
          </View>
          <View style={styles.deliveryTextContainer}>
            <Text style={[typography.textXm, typography.textXlB]}>
              Encontro em local público
            </Text>
            <Text style={[typography.textXs, styles.deliverySubtext]}>
              Prefiro combinar em um ponto de encontro
            </Text>
          </View>
        </Pressable>

        <Pressable
          style={[
            styles.deliveryOption,
            deliveryPreference === "both" && styles.deliveryOptionSelected,
          ]}
          onPress={() => setDeliveryPreference("both")}
        >
          <View style={styles.radioCircle}>
            {deliveryPreference === "both" && (
              <View style={styles.radioCircleSelected} />
            )}
          </View>
          <View style={styles.deliveryTextContainer}>
            <Text style={[typography.textXm, typography.textXlB]}>
              Ambas as opções
            </Text>
            <Text style={[typography.textXs, styles.deliverySubtext]}>
              Flexível quanto ao método de entrega
            </Text>
          </View>
        </Pressable>
      </View>

      {/* Tipos de livros que possui */}
      <View style={styles.section}>
        <Text style={[typography.textXm, styles.label]}>
          Tipos de livros que possui (opcional)
        </Text>
        <View style={styles.bookTypesContainer}>
          {bookTypesOptions.map((bookType) => (
            <Pressable
              key={bookType.id}
              style={[
                styles.bookTypeChip,
                selectedBookTypes.includes(bookType.id) &&
                  styles.bookTypeChipSelected,
              ]}
              onPress={() => toggleBookType(bookType.id)}
            >
              <Text
                style={[
                  typography.textXm,
                  selectedBookTypes.includes(bookType.id) &&
                    styles.bookTypeTextSelected,
                ]}
              >
                {bookType.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Botão de envio */}
      <Btn title="Criar Perfil de Doador" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionTitle: {
    marginBottom: 24,
    textAlign: "center",
  },
  section: {
    marginBottom: 24,
  },
  label: {
    marginBottom: 12,
    color: "#333",
    fontWeight: "600",
  },
  radioGroup: {
    gap: 12,
  },
  radioOption: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  radioOptionSelected: {
    backgroundColor: "#E3F2FD",
    borderColor: "#3A7DFF",
  },
  radioTextSelected: {
    color: "#3A7DFF",
    fontWeight: "600",
  },
  deliveryOption: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E0E0E0",
    marginBottom: 12,
  },
  deliveryOptionSelected: {
    borderColor: "#3A7DFF",
    backgroundColor: "#F0F7FF",
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#999",
    marginRight: 12,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  radioCircleSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3A7DFF",
  },
  deliveryTextContainer: {
    flex: 1,
  },
  deliverySubtext: {
    color: "#666",
    marginTop: 4,
  },
  bookTypesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  bookTypeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  bookTypeChipSelected: {
    backgroundColor: "#3A7DFF",
    borderColor: "#3A7DFF",
  },
  bookTypeTextSelected: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});

export default UserRegistrationFormStep2Donor;
