import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { typography } from "../../style/index";

const WelcomeHeader = ({ userName }) => {
  return (
    <View style={styles.topWelcomeCard}>
      <Text style={[typography.title, styles.welcomeTitle]}>
        Olá, {userName}! 👋
      </Text>
      <Text style={[typography.textXl, styles.welcomeSubtitle]}>
        Que bom ter você de volta
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topWelcomeCard: {
    backgroundColor: "#007AFF",
    padding: 20,
    paddingVertical: 30,
    marginBottom: 10,
  },
  welcomeTitle: {
    color: "#FFFFFF",
    marginBottom: 4,
  },
  welcomeSubtitle: {
    color: "#FFFFFF",
  },
});

export default WelcomeHeader;
