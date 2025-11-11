import NoConversation from "@/components/NoConversation";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ListChat from "../../components/chat/ListChat";

export default function Message() {
  const [hasConversations, setHasConversations] = useState(true);

  // Simular verificação de conversas
  // Depois você vai buscar do backend ou AsyncStorage
  useEffect(() => {
    // Para testar empty state, mude para false
    setHasConversations(true);
  }, []);

  return (
    <View style={styles.container}>
      {hasConversations ? <ListChat /> : <NoConversation />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});
