import { Image, StyleSheet, Text, View } from "react-native";

export default function Message() {
  return (
    <View style={style.container}>
      <Image
        source={require("@/assets/image/icons/diamente.svg")}
        style={style.icon}
      />
      <Text style={style.text}>Sistema de Mensagens</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F7",
  },
  icon: {},
  text: {
    color: "#121212",
    fontSize: 18,
    fontWeight: "bold",
  },
});
