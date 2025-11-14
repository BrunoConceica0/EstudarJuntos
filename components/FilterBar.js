import React from "react";
import { TouchableOpacity, Text, ScrollView, StyleSheet } from "react-native";

const FilterBar = ({ selectedFilter, onFilterChange }) => {
  const filters = [
    { key: "all", label: "Todos" },
    { key: "Novo", label: "Novos" },
    { key: "Usado - Ótimo", label: "Usado Ótimo" },
    { key: "Usado - Bom", label: "Usado Bom" },
    { key: "Usado - Regular", label: "Usado Regular" },
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[
            styles.filterButton,
            selectedFilter === filter.key && styles.filterButtonSelected,
          ]}
          onPress={() => onFilterChange(filter.key)}
        >
          <Text
            style={[
              styles.filterText,
              selectedFilter === filter.key && styles.filterTextSelected,
            ]}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 50,
    marginHorizontal: 10,
  },
  contentContainer: {
    paddingHorizontal: 10,
    alignItems: "center",
  },
  filterButton: {
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  filterButtonSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  filterText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
  },
  filterTextSelected: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FilterBar;
