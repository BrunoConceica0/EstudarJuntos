import { View, Text, StyleSheet, Pressable } from "react-native";
import { typography } from "@/style";
import { Ionicons } from "@expo/vector-icons";

interface UserTypeSelectionProps {
  onSelect: (type: "student" | "donor") => void;
}

const UserTypeSelection = ({ onSelect }: UserTypeSelectionProps) => {
  return (
    <View style={styles.container}>
      <Text style={[typography.title, styles.title]}>
        Você é doador ou estudante?
      </Text>
      <Text style={[typography.textXm, styles.subtitle]}>
        Selecione uma opção para continuar
      </Text>

      <View style={styles.optionsContainer}>
        <Pressable
          style={styles.optionCard}
          onPress={() => onSelect("student")}
        >
          <View style={[styles.iconContainer, styles.studentIcon]}>
            <Ionicons name="school-outline" size={40} color="#3A7DFF" />
          </View>
          <Text style={[typography.textXlB, styles.optionTitle]}>
            Estudante
          </Text>
          <Text style={[typography.textXm, styles.optionDescription]}>
            Quero receber livros para estudar
          </Text>
        </Pressable>

        <Pressable style={styles.optionCard} onPress={() => onSelect("donor")}>
          <View style={[styles.iconContainer, styles.donorIcon]}>
            <Ionicons name="heart-outline" size={40} color="#FF6B35" />
          </View>
          <Text style={[typography.textXlB, styles.optionTitle]}>Doador</Text>
          <Text style={[typography.textXm, styles.optionDescription]}>
            Quero doar livros para estudantes
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
  },
  optionsContainer: {
    gap: 20,
  },
  optionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 2,
    borderColor: "transparent",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  studentIcon: {
    backgroundColor: "#E3F2FD",
  },
  donorIcon: {
    backgroundColor: "#FFE5DB",
  },
  optionTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: "#333",
  },
  optionDescription: {
    textAlign: "center",
    color: "#666",
  },
});

export default UserTypeSelection;
