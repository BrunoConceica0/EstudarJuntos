import { View, Text, Modal, StyleSheet } from "react-native";
import { utility, typography } from "@/style/index";
import Button from "@/components/common/Buttom";

interface ModalRegisterSuccessProps {
  visible: boolean;
  onClose: () => void;
  name: string;
}

const ModalRegisterSuccess = ({
  visible,
  onClose,
  name,
}: ModalRegisterSuccessProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={utility.overlay}>
        <View style={utility.modalContainer}>
          <Text style={[utility.textCenter, typography.title]}>
            Tudo pronto, {name}! 🎉
          </Text>

          <Text style={[utility.textCenter, utility.p16, typography.textXm]}>
            Seu cadastro foi concluído.
          </Text>

          <Button title="Explorar o App" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};
export default ModalRegisterSuccess;
