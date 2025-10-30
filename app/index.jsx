import { StyleSheet, View } from "react-native";
import Message from "@/views/message/Message";

export default function Index() {
  return (
    <View style={styles.content}>
      <Message />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    flex: 1,
  },
});
