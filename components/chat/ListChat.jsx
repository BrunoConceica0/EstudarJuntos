import ChatItem from "@/components/chat/ChatItem";
import NoConversation from "@/components/chat/NoConversation";
import { FlatList, StyleSheet, View } from "react-native";

export default function ListChat() {
  // Dados de exemplo - depois você vai buscar de uma API ou contexto
  const conversations = [
    {
      id: 1,
      name: "Maria Santos",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Olá! Vi que você tem o livro 'Dom Casmurro'.",
      timestamp: "12:30",
      unread: 2,
    },
    {
      id: 2,
      name: "João Silva",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastMessage: "Obrigado pela doação!",
      timestamp: "11:45",
      unread: 0,
    },
    {
      id: 3,
      name: "Ana Costa",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "Quando podemos combinar a entrega?",
      timestamp: "Ontem",
      unread: 1,
    },
  ];

  // Se não tiver conversas, mostra empty state
  if (conversations.length === 0) {
    return <NoConversation />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ChatItem chat={item} />}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContent: {
    flexGrow: 1,
  },
});
