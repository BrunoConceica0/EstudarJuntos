import React from "react";
import { Text, Image, View, Modal, StyleSheet, Pressable } from "react-native";
import Button from "@/components/common/Buttom";
import { typography } from "@/style";
import ModalConquestProps from "@/interfaces/ModalConquestProps";

export default function ModalConquest({
  visible,
  onClose,
  title = "Conquista Desbloqueada!",
  description = 'Você conquistou o badge "Bibliotecário Amigo" por realizar 10 doações!',
}: ModalConquestProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay escuro - clica fora fecha */}
      <Pressable style={styles.overlay} onPress={onClose}>
        {/* Container do modal - impede fechar ao clicar dentro */}
        <Pressable
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Troféu */}
          <View style={styles.imageContainer}>
            <Image
              source={require("@/assets/image/trophy.png")}
              style={styles.trophy}
              resizeMode="contain"
            />
          </View>

          {/* Conteúdo */}
          <View style={styles.content}>
            <Text style={[typography.subtitle, styles.title]}>{title}</Text>
            <Text style={[typography.textXm, styles.description]}>
              {description}
            </Text>

            {/* Botão */}
            <Button title="Incrível!" onPress={onClose} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fundo escuro semitransparente
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: "center",
    width: "85%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  imageContainer: {
    marginBottom: 20,
  },
  trophy: {
    width: 100,
    height: 100,
  },
  content: {
    alignItems: "center",
    width: "100%",
  },
  title: {
    color: "#1E90FF",
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
});
