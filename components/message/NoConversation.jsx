import { typography } from "@/style/index";
import { Image, StyleSheet, Text, View } from "react-native";
export default function NoConversation() {
  return (
    <View style={style.content}>
      <Image
        source={require("@/assets/image/chat.png")}
        style={{ width: 100, height: 100, marginRight: 10 }}
      />
      <Text style={typography.subtitle}>Nenhuma conversa ainda</Text>
    </View>
  );
}

const style = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});
