import { StyleSheet, View } from "react-native";
import NoConversation from "../../components/NoConversation";
import Chat from "./chat/index";

export default function Message() {
  const isConversation = true; // Você pode controlar isso com estado real

  return (
    <View style={style.container}>
      {isConversation ? <Chat /> : <NoConversation />}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    width: "100%",
  },
});
