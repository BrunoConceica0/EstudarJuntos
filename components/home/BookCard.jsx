import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { typography } from "../../style/index";

const BookCard = ({ title, subject, distance, imageSource, onPress }) => {
  const subjectColorMap = {
    Física: "#28A745",
    Matemática: "#DC3545",
    Biologia: "#17A2B8",
  };

  const subjectColor = subjectColorMap[subject] || "#007AFF";

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.gradientEffect}>
        {imageSource && (
          <Image
            source={imageSource}
            style={styles.bookImage}
            resizeMode="contain"
          />
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={[typography.textXs, styles.title]} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.subjectRow}>
            <MaterialCommunityIcons
              name="circle"
              size={8}
              color={subjectColor}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                typography.textXm,
                { color: subjectColor, fontWeight: "600" },
              ]}
            >
              {subject}
            </Text>
          </View>

          <View style={styles.distanceRow}>
            <MaterialCommunityIcons
              name="map-marker"
              size={14}
              color="#999"
              style={{ marginRight: 2 }}
            />
            <Text style={[typography.textXm, styles.distanceText]}>
              {distance}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 140,
    marginRight: 15,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  gradientEffect: {
    height: 140,
    backgroundColor: "#f0f4ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  bookImage: {
    width: "70%",
    height: "70%",
  },

  infoContainer: {
    padding: 10,
    paddingTop: 12,
    height: 80,
    justifyContent: "space-between",
  },
  title: {
    color: "#333",
    marginBottom: 5,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  subjectRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  distanceText: {
    color: "#999",
  },
});

export default BookCard;
