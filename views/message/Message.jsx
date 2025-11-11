import { useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Chat from "../../components/chat/index";
import ListChat from "../../components/chat/ListChat";
import NoConversation from "../../components/NoConversation";

export default function Message() {
  const params = useLocalSearchParams;
  const isConversation =
    params.isConversation === "true" || params.isConversation === true;

  return (
    <SafeAreaView style={style.container} edges={["top", "left", "right"]}>
      {/* Lista de chats COM SCROLL se necessário */}
      <View style={style.listContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 0 }}
        >
          <ListChat />
        </ScrollView>
      </View>

      {/* Chat ocupa o resto */}
      <View style={style.chatContainer}>
        {isConversation ? <Chat /> : <NoConversation />}
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    width: "100%",
  },
  listContainer: {
    maxHeight: 200, // Usa maxHeight para permitir altura dinâmica até o limite
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  chatContainer: {
    flex: 1,
  },
});
