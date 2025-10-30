import { typography } from "@/style/index";
import { Image, StyleSheet, Text, View } from "react-native";

export default function NoConversation() {
  return (
    <View style={style.content}>
      <View style={style.innerContent}>
        <Image source={require("@/assets/image/chat.png")} style={style.img} />
        <Text style={typography.subtitle}>Nenhuma conversa ainda</Text>
        <Text style={[typography.textXm, style.text]}>
          Quando você demonstrar interesse em um livro, um chat será iniciado
          com o doador.
        </Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  innerContent: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  img: {
    width: 64,
    height: 64,
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 5,
  },
});
