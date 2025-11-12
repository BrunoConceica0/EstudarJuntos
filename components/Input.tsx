import IInputProps from "@/interfaces/IInputProps";
import { typography } from "@/style/index";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function Input({ label, error, style, ...rest }: IInputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={[typography.textXs, styles.label]}>{label}</Text>}
      <TextInput
        style={[
          typography.textXl,
          styles.input,
          error && styles.inputError,
          style,
        ]}
        placeholderTextColor="#8e8e93"
        {...rest}
      />
      {error && (
        <Text style={[typography.textXm, styles.errorText]}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    color: "#121212",
  },
  inputError: {
    borderColor: "#DC3545",
  },
  errorText: {
    color: "#DC3545",
    marginTop: 4,
  },
});
