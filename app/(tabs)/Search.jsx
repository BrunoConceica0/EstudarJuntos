import { StyleSheet } from "react-native";
import SearchScreen from "../screens/SearchScreen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Search() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <SearchScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});
