import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { typography } from "../style/index";

const QuickActionCard = ({
  title,
  iconName,
  iconLib: IconComponent,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.quickActionItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.quickActionIconContainer}>
        <IconComponent name={iconName} size={30} color="#555" />
      </View>
      <Text style={[typography.textXm, styles.quickActionText]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  quickActionItem: {
    width: "25%",
    alignItems: "center",
    paddingVertical: 10,
  },
  quickActionIconContainer: {
    marginBottom: 8,
  },
  quickActionText: {
    textAlign: "center",
  },
});

export default QuickActionCard;
