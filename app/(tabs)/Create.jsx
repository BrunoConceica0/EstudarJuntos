import { StyleSheet } from "react-native";
import BookDonationScreen from "../screens/BookDonationScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Create() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <BookDonationScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});
