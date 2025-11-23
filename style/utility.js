import { StyleSheet, Platform } from "react-native";

const utility = StyleSheet.create({
  p4: { padding: 4 },
  p8: { padding: 8 },
  p12: { padding: 12 },
  p16: { padding: 16 },
  p20: { padding: 20 },
  p24: { padding: 24 },
  p32: { padding: 32 },
  p40: { padding: 40 },
  p48: { padding: 48 },

  px4: { paddingHorizontal: 4 },
  px8: { paddingHorizontal: 8 },
  px12: { paddingHorizontal: 12 },
  px16: { paddingHorizontal: 16 },
  px20: { paddingHorizontal: 20 },
  px24: { paddingHorizontal: 24 },
  px32: { paddingHorizontal: 32 },
  px40: { paddingHorizontal: 40 },

  py4: { paddingVertical: 4 },
  py8: { paddingVertical: 8 },
  py12: { paddingVertical: 12 },
  py16: { paddingVertical: 16 },
  py20: { paddingVertical: 20 },
  py24: { paddingVertical: 24 },
  py32: { paddingVertical: 32 },
  py40: { paddingVertical: 40 },

  pt4: { paddingTop: 4 },
  pt8: { paddingTop: 8 },
  pt12: { paddingTop: 12 },
  pt16: { paddingTop: 16 },
  pt20: { paddingTop: 20 },
  pt24: { paddingTop: 24 },
  pt32: { paddingTop: 32 },
  pt40: { paddingTop: 40 },

  pb4: { paddingBottom: 4 },
  pb8: { paddingBottom: 8 },
  pb12: { paddingBottom: 12 },
  pb16: { paddingBottom: 16 },
  pb20: { paddingBottom: 20 },
  pb24: { paddingBottom: 24 },
  pb32: { paddingBottom: 32 },
  pb40: { paddingBottom: 40 },

  pl4: { paddingLeft: 4 },
  pl8: { paddingLeft: 8 },
  pl12: { paddingLeft: 12 },
  pl16: { paddingLeft: 16 },
  pl20: { paddingLeft: 20 },
  pl24: { paddingLeft: 24 },
  pl32: { paddingLeft: 32 },
  pl40: { paddingLeft: 40 },

  pr4: { paddingRight: 4 },
  pr8: { paddingRight: 8 },
  pr12: { paddingRight: 12 },
  pr16: { paddingRight: 16 },
  pr20: { paddingRight: 20 },
  pr24: { paddingRight: 24 },
  pr32: { paddingRight: 32 },
  pr40: { paddingRight: 40 },

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
  textCenter: {
    textAlign: "center",
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
