import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ChatItem({ chat }) {
  const router = useRouter();

  // Dados de exemplo caso não venha props
  const chatData = chat || {
    id: 1,
    name: "Maria Santos",
    avatar: "https://via.placeholder.com/50",
    lastMessage: "Olá! Vi que você tem o livro...",
    timestamp: "12:30",
    unread: 2,
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => {
        router.push({
          pathname: "/chat/[id]",
          params: {
            id: chatData.id,
            name: chatData.name,
            avatar: chatData.avatar,
          },
        });
      }}
    >
      <Image source={{ uri: chatData.avatar }} style={styles.avatar} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{chatData.name}</Text>
          <Text style={styles.timestamp}>{chatData.timestamp}</Text>
        </View>

        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chatData.lastMessage}
          </Text>
          {chatData.unread > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{chatData.unread}</Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    backgroundColor: "#fff",
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: "#F5F5F5",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#E5E5E5",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  timestamp: {
    fontSize: 12,
    color: "#8E8E93",
  },
  messageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  lastMessage: {
    fontSize: 14,
    color: "#8E8E93",
    flex: 1,
  },
  badge: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
    marginLeft: 8,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});
