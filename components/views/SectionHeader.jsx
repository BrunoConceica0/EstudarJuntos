import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { typography } from "../../style/index";

const SectionHeader = ({ title, onViewAll }) => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={[typography.textXs, styles.sectionTitle]}>{title}</Text>
      {onViewAll && (
        <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
          <Text style={[typography.textXlB, styles.viewAllText]}>
            Ver todos ›
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#333",
  },
  viewAllText: {
    fontWeight: "600",
  },
});

export default SectionHeader;
