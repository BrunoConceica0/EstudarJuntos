import NoConversation from "@/components/chat/NoConversation";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ListChat from "../../components/chat/ListChat";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Message() {
  const [hasConversations, setHasConversations] = useState(true);

  // Simular verificação de conversas
  // Depois você vai buscar do backend ou AsyncStorage
  useEffect(() => {
    // Para testar empty state, mude para false
    setHasConversations(true);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {hasConversations ? <ListChat /> : <NoConversation />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});
