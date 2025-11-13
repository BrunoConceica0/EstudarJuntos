import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { typography, cores } from "../../style/index";

const CategoryItem = ({ title, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        isSelected && [styles.categoryItemSelected, cores.primary],
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          typography.textXm,
          styles.categoryText,
          isSelected && [styles.categoryTextSelected, cores.btnText],
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    marginRight: 10,
  },
  categoryItemSelected: {
    // Cor aplicada via cores.primary
  },
  categoryText: {
    color: "#333",
    fontWeight: "500",
  },
  categoryTextSelected: {
    fontWeight: "bold",
    // Cor aplicada via cores.btnText
  },
});

export default CategoryItem;
