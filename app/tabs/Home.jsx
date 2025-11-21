import { StyleSheet, View } from "react-native";
import Home from "@/app/auth/login";
export default function Profile() {
  return (
    <View style={styles.container}>
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    alignItems: "center",
  },
});
