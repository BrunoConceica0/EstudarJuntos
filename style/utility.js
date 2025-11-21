import { StyleSheet, Platform } from "react-native";

const utility = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  main: {
    flex: 1,
  },
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
    backgroundColor: "#fff",
    borderColor: "#3A7DFF",
    borderWidth: 2,
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: "#cccccc",
  },

  // modal Entrega
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "90%",
    maxWidth: 500,
    // Sombra usando elevation para Android e iOS
    elevation: 5,
    // Para iOS, usa shadowColor separadamente (sem warning no React Native)
    ...(Platform.OS === "ios" && {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    }),
  },
  headerModal: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 8,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  titleModal: {
    marginBottom: 0,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  labelModal: {
    marginBottom: 8,
  },
  dateInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  dateText: {
    color: "#121212",
  },
  timeOptionsContainer: {
    gap: 8,
  },
  timeOption: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F5F5F5",
    borderWidth: 2,
    borderColor: "transparent",
  },
  timeOptionSelected: {
    backgroundColor: "#E3F2FD",
    borderWidth: 2,
  },
  timeOptionPressed: {
    opacity: 0.7,
  },
  timeOptionText: {
    textAlign: "left",
  },
  textInput: {
    minHeight: 60,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 4,
  },
  buttonWrapper: {
    flex: 1,
    textAlign: "center",
  },
});

export default utility;
