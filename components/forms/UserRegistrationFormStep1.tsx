import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Pressable,
  ScrollView,
} from "react-native";
import Input from "@/components/common/Input";
import Btn from "@/components/common/Buttom";
import { typography } from "@/style";
import DateTimePicker from "@react-native-community/datetimepicker";
import IUserRegistrationFormProps, {
  IStep1Data,
} from "@/interfaces/IUserRegistrationFormProps";

export default function UserRegistrationForm({
  onSubmit,
  onNext,
}: IUserRegistrationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || birthDate;
    setShowDatePicker(Platform.OS === "ios");
    setBirthDate(currentDate);
  };

  const validate = () => {
    let isValid = true;
    const newErrors = { name: "", email: "", password: "" };

    if (name.trim().length < 3) {
      newErrors.name = "Nome deve ter pelo menos 3 caracteres";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "E-mail inválido";
      isValid = false;
    }

    if (password.length < 6) {
      newErrors.password = "A senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validate()) {
      onNext({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        birthDate,
      } as IStep1Data);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Input
        label="Nome Completo"
        placeholder="Seu nome"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (errors.name) setErrors({ ...errors, name: "" });
        }}
        error={errors.name}
      />

      {/* E-mail */}
      <Input
        label="E-mail"
        placeholder="seu-email@exemplo.com"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          if (errors.email) setErrors({ ...errors, email: "" });
        }}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Input
        label="Senha"
        placeholder="Mínimo 6 caracteres"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (errors.password) setErrors({ ...errors, password: "" });
        }}
        error={errors.password}
        secureTextEntry
      />

      <View style={styles.inputGroup}>
        <Text style={[typography.textXs, styles.label]}>
          Data de Nascimento
        </Text>
        <Pressable
          style={styles.dateInput}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={typography.textXl}>{formatDate(birthDate)}</Text>
        </Pressable>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={birthDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onDateChange}
          maximumDate={new Date()}
          minimumDate={new Date(1900, 0, 1)}
        />
      )}

      {/* Botão */}
      <Btn title="Continuar" onPress={handleSubmit} />
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
  inputWithHint: {
    marginBottom: 16,
  },
  hint: {
    marginTop: -12,
    fontSize: 12,
    color: "#6c757d",
    marginLeft: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    color: "#343a40",
  },
  dateInput: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
