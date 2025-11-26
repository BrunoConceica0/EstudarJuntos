// UserRegistrationFormStep2.tsx

import { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import Input from "@/components/common/Input";
import Btn from "@/components/common/Buttom";
import { typography } from "@/style";

interface IUserRegistrationFormStep2Props {
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
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const [errors, setErrors] = useState({
    cep: "",
    state: "",
    city: "",
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
    const newErrors = { cep: "", state: "", city: "", subjects: "", goals: "" };

    const cepRegex = /^\d{5}-\d{3}$/;
    if (!cepRegex.test(cep)) {
      newErrors.cep = "CEP inválido. Use o formato XXXXX-XXX.";
      isValid = false;
    }

    if (!state || state.trim().length === 0) {
      newErrors.state = "Estado é obrigatório.";
      isValid = false;
    }

    if (!city || city.trim().length === 0) {
      newErrors.city = "Cidade é obrigatória.";
      isValid = false;
    }

    if (selectedSubjects.length === 0) {
      newErrors.subjects = "Selecione pelo menos uma matéria.";
      isValid = false;
    }

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
        cep: cep.replace("-", ""),
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
          let formattedText = text.replace(/\D/g, "");
          if (formattedText.length > 5) {
            formattedText =
              formattedText.slice(0, 5) + "-" + formattedText.slice(5, 8);
          }
          setCep(formattedText);
          if (errors.cep) setErrors({ ...errors, cep: "" });
        }}
        error={errors.cep}
        keyboardType="numeric"
        maxLength={9}
      />
      <Text style={[typography.textXm, styles.hint]}>
        Para encontrar doadores próximos a você
      </Text>

      {/* Estado e Cidade */}
      <View style={styles.stateCityContainer}>
        <View style={styles.stateContainer}>
          <Input
            label="Estado"
            placeholder="Ex: SP"
            value={state}
            onChangeText={(text) => {
              setState(text.toUpperCase());
              if (errors.state) setErrors({ ...errors, state: "" });
            }}
            maxLength={2}
            autoCapitalize="characters"
            error={errors.state}
          />
        </View>
        <View style={styles.cityContainer}>
          <Input
            label="Cidade"
            placeholder="Ex: São Paulo"
            value={city}
            onChangeText={(text) => {
              setCity(text);
              if (errors.city) setErrors({ ...errors, city: "" });
            }}
            error={errors.city}
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

      <Btn title="Finalizar Cadastro" onPress={handleSubmit} />
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
    color: "#6c757d",
  },
  stateCityContainer: {
    flexDirection: "row",
    marginBottom: 8,
    gap: 12,
  },
  stateContainer: {
    flex: 1,
  },
  cityContainer: {
    flex: 2,
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
  subjectButton: {
    width: "48%",
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  subjectButtonSelected: {
    borderColor: "#3A7DFF",
    backgroundColor: "#E6F0FF",
  },
  goalButton: {
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
  },
  goalButtonSelected: {
    borderColor: "transparent",
    backgroundColor: "#3A7DFF",
  },
  selectionButtonSelected: {},
  selectionText: {
    color: "#343a40",
  },
  selectionTextSelected: {
    color: "black",
  },
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
