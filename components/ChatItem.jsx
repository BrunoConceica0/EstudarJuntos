import { useRouter } from "expo-router";
import { Image, Text, StyleSheet, Pressable } from "react-native";

export default function ChatItem() {
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() => {
        router.navigate("@/views/message/chat/index", {
          relativeToDirectory: true,
        });
      }}
    >
      <Image
        source={require("../assets/image/user.jpg")}
        style={styles.avatar}
      />
      <Text style={styles.text}>Nome Usuário</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginHorizontal: 30,
    backgroundColor: "#fff",
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: "#f5f5f5",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  text: {
    fontSize: 16,
  },
});
