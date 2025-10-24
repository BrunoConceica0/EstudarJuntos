// typography.js
import { StyleSheet } from "react-native";

const typography = StyleSheet.create({
  title: {
    fontFamily: "OpenSans-Regular",
    fontSize: 32,
    fontWeight: "700",
    color: "#121212",
  },
  subtitle: {
    fontFamily: "OpenSans-Regular",
    fontSize: 24,
    fontWeight: "700",
    color: "#121212",
  },
  textXs: {
    fontFamily: "Roboto-Regular",
    fontSize: 18,
    fontWeight: "600",
    color: "#121212",
  },
  textXl: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: "#8e8e93",
  },
  textXm: {
    fontFamily: "Roboto-Regular",
    fontSize: 12,
    color: "#8e8e93",
  },
});

export default typography;
