import { View, Text, Modal, StyleSheet } from "react-native";
import { utility, typography } from "@/style/index";
import Button from "@/components/common/Buttom";

interface ModalRegisterSuccessDonorProps {
  visible: boolean;
  onClose: () => void;
  name: string;
}

const ModalRegisterSuccessDonor = ({
  visible,
  onClose,
  name,
}: ModalRegisterSuccessDonorProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={utility.overlay}>
        <View style={utility.modalContainer}>
          {/* Emoji de mãos apertando */}
          <Text style={styles.emoji}>🤝</Text>

          <Text style={[typography.title, utility.textCenter, styles.title]}>
            Obrigado por se juntar à nossa causa!
          </Text>

          <Text style={[utility.textCenter, utility.p16, typography.textXm, styles.message]}>
            Seu perfil foi criado. Você já pode começar a doar e transformar o futuro de um estudante.
          </Text>

          <Button title="Doar meu primeiro livro" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  emoji: {
    fontSize: 64,
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    color: "#3A7DFF",
    marginBottom: 12,
  },
  message: {
    color: "#666",
    lineHeight: 22,
  },
});

export default ModalRegisterSuccessDonor;
