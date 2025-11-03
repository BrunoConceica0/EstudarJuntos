import { StyleSheet, View } from "react-native";
import NoConversation from "../../components/NoConversation";
import Chat from "./chat/index";
import ListChat from "./chat/ListChat";

export default function Message() {
  const isConversation = true; //false quando não tiver conversa

  return (
    <View style={style.container}>
      <ListChat />
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
