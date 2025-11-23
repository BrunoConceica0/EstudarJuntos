import { StyleSheet } from "react-native";
import ProfileScreen from "../screens/ProfileScreen";
// import ProfileScreen from "@/components/forms/ModalRegisterSuccess";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Profile() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ProfileScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});
