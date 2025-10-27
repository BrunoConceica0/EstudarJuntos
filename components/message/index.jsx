import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import NoConversation from "./NoConversation";

export default function Message() {
  return (
    <View style={style.container}>
      <FontAwesome5 name="star" size={24} color="#FFD43B" />
      <Text style={style.text}>Sistema de Mensagens</Text>
      {!isConversation && <NoConversation />}
    </View>
  );
}
const isConversation = false;
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "80%",
    margin: "auto",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});
