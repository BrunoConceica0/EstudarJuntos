import { StyleSheet, Text, View } from "react-native";
import NoConversation from "../../components/NoConversation";
import Chat from "./chat/index";

export default function Message() {
  return (
    <View style={style.container}>
      <Chat />
      <Text style={style.text}>Sistema de Mensagens</Text>
      {!isConversation && <NoConversation />}
    </View>
  );
}
const isConversation = true;
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
