import { typography } from "@/style/index";
import { Image, StyleSheet, Text, View } from "react-native";
export default function NoConversation() {
  return (
    <View style={style.content}>
      <Image source={require("@/assets/image/chat.png")} style={style.img} />
      <Text style={typography.subtitle}>Nenhuma conversa ainda</Text>
      <Text style={[typography.textXm, style.text]}>
        Quando você demonstrar interesse em um livro, um chat será iniciado com
        o doador.
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  content: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    height: "100vh",
    marginTop: 700,
  },
  img: {
    width: 64,
    height: 64,
  },
  text: {
    textAlign: "center",
  },
});
