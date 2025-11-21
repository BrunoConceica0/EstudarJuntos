// UserRegistrationFormStep2.tsx

import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import Input from "@/components/common/Input";
import Btn from "@/components/common/Buttom";
import { typography } from "@/style";
// Assumindo que você tem um arquivo de estilo com cores

interface IUserRegistrationFormStep2Props {
  // Dados da primeira etapa são recebidos como props
  initialData: {
    name: string;
    email: string;
    password: string;
    birthDate: Date;
  };
  onSubmit: (data: any) => void;
}

const subjectsOptions = [
  "Matemática",
  "Física",
  "Química",
  "Biologia",
  "História",
  "Geografia",
  "Português",
  "Literatura",
];
const goalsOptions = [
  "ENEM",
  "FUVEST",
  "UNICAMP",
  "UNESP",
  "Reforço Escolar",
  "Concursos",
];

export default function UserRegistrationFormStep2({
  initialData,
  onSubmit,
}: IUserRegistrationFormStep2Props) {
  const [cep, setCep] = useState("");
  const [state, setState] = useState("SP"); // Valor inicial da imagem
  const [city, setCity] = useState("São Paulo"); // Valor inicial da imagem
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]); // Selecionados na imagem

  const [errors, setErrors] = useState({
    cep: "",
    subjects: "",
    goals: "",
  });

  const toggleSelection = (
    list: string[],
    item: string,
    setList: (list: string[]) => void
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { cep: "", subjects: "", goals: "" };

    // Validação CEP
    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(cep)) {
      newErrors.cep = "CEP inválido. Use o formato XXXXX-XXX.";
      isValid = false;
    }
    // Você pode adicionar mais validações aqui (ex: se state/city são preenchidos)

    // Validação Matérias
    if (selectedSubjects.length === 0) {
      newErrors.subjects = "Selecione pelo menos uma matéria.";
      isValid = false;
    }

    // Validação Objetivos
    if (selectedGoals.length === 0) {
      newErrors.goals = "Selecione pelo menos um objetivo.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit({
        ...initialData,
        cep: cep.replace("-", ""), // Remover o hífen para o backend
        state,
        city,
        subjects: selectedSubjects,
        goals: selectedGoals,
      });
    }
  };

  const SelectionButton = ({
    label,
    isSelected,
    onPress,
    isGoal = false,
  }: {
    label: string;
    isSelected: boolean;
    onPress: () => void;
    isGoal?: boolean;
  }) => (
    <Pressable
      style={[
        styles.selectionButton,
        isSelected && styles.selectionButtonSelected,
        isGoal ? styles.goalButton : styles.subjectButton,
        isSelected &&
          (isGoal ? styles.goalButtonSelected : styles.subjectButtonSelected),
      ]}
      onPress={onPress}
    >
      {!isGoal && (
        <View
          style={[styles.checkbox, isSelected && styles.checkboxSelected]}
        />
      )}
      <Text
        style={[
          typography.textXm,
          styles.selectionText,
          isSelected && styles.selectionTextSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );

  // O componente UserRegistrationFormStep2 deve ser um ScrollView.
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* CEP */}
      <Input
        label="CEP"
        placeholder="00000-000"
        value={cep}
        onChangeText={(text) => {
          // Lógica básica para adicionar o hífen
          let formattedText = text.replace(/\D/g, ""); // Remove tudo que não é dígito
          if (formattedText.length > 5) {
            formattedText =
              formattedText.slice(0, 5) + "-" + formattedText.slice(5, 8);
          }
          setCep(formattedText);
          if (errors.cep) setErrors({ ...errors, cep: "" });
        }}
        error={errors.cep}
        keyboardType="numeric"
        maxLength={9} // 5 dígitos + hífen + 3 dígitos
      />
      <Text style={[typography.textXm, styles.hint]}>
        Para encontrar doadores próximos a você
      </Text>

      {/* Estado e Cidade */}
      <View style={styles.stateCityContainer}>
        <View style={styles.stateContainer}>
          <Text style={[typography.textXs, styles.label]}>Estado</Text>
          {/* Usando TextInput simples, mas em um app real seria um Picker/Dropdown */}
          <TextInput
            style={styles.stateInput}
            value={state}
            onChangeText={setState}
            maxLength={2}
            autoCapitalize="characters"
          />
        </View>
        <View style={styles.cityContainer}>
          <Text style={[typography.textXs, styles.label]}>Cidade</Text>
          <TextInput
            style={styles.cityInput}
            value={city}
            onChangeText={setCity}
          />
        </View>
      </View>

      {/* Matérias */}
      <Text style={[typography.subtitle, styles.sectionTitle]}>
        Quais matérias você mais precisa?
      </Text>
      <View style={styles.optionsContainer}>
        {subjectsOptions.map((subject) => (
          <SelectionButton
            key={subject}
            label={subject}
            isSelected={selectedSubjects.includes(subject)}
            onPress={() =>
              toggleSelection(selectedSubjects, subject, setSelectedSubjects)
            }
          />
        ))}
      </View>
      {errors.subjects ? (
        <Text style={styles.errorText}>{errors.subjects}</Text>
      ) : null}

      {/* Objetivos */}
      <Text style={[typography.subtitle, styles.sectionTitle]}>
        Seus Objetivos
      </Text>
      <View style={styles.optionsContainer}>
        {goalsOptions.map((goal) => (
          <SelectionButton
            key={goal}
            label={goal}
            isGoal={true}
            isSelected={selectedGoals.includes(goal)}
            onPress={() =>
              toggleSelection(selectedGoals, goal, setSelectedGoals)
            }
          />
        ))}
      </View>
      {errors.goals ? (
        <Text style={styles.errorText}>{errors.goals}</Text>
      ) : null}

      {/* Botão de Finalizar */}
      <Btn
        title="Finalizar Cadastro"
        onPress={handleSubmit}
        // style={styles.finalButton}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  hint: {
    marginTop: -12,
    marginBottom: 24,
    marginLeft: 2,
    color: "#6c757d", // Cor de texto suave
  },
  stateCityContainer: {
    flexDirection: "row",
    marginBottom: 24,
    justifyContent: "space-between",
  },
  stateContainer: {
    width: "30%",
  },
  cityContainer: {
    width: "65%",
  },
  label: {
    marginBottom: 8,
    color: "#343a40",
  },
  stateInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#E9ECEF", // Fundo cinza claro como na imagem
    justifyContent: "center",
  },
  cityInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: "#fff", // Fundo branco
    justifyContent: "center",
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 12,
    color: "#343a40",
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  selectionButton: {
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  // Estilos específicos para as matérias (maioria 2 por linha)
  subjectButton: {
    width: "48%",
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  subjectButtonSelected: {
    borderColor: "#3A7DFF",
    backgroundColor: "#E6F0FF", // Cor de fundo claro para seleção
  },
  // Estilos específicos para os objetivos (tamanho variável)
  goalButton: {
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  goalButtonSelected: {
    borderColor: "transparent",
    backgroundColor: "#3A7DFF", // Cor de fundo azul sólido para objetivo
  },
  selectionButtonSelected: {
    // Geral para todos os selecionados
  },
  selectionText: {
    color: "#343a40",
  },
  selectionTextSelected: {
    color: "black", // Cor do texto
  },
  // Checkbox para matérias
  checkbox: {
    width: 14,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#adb5bd",
    marginRight: 8,
  },
  checkboxSelected: {
    backgroundColor: "#3A7DFF",
    borderColor: "#3A7DFF",
  },
  errorText: {
    color: "red",
    marginBottom: 12,
    fontSize: 14,
  },
  finalButton: {
    marginTop: 20,
    marginBottom: 40,
  },
});
