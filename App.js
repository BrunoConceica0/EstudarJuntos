import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      try {
        await Font.loadAsync({
          // OpenSans - Variações principais
          "OpenSans-Light": require("./assets/fonts/static/OpenSans-Light.ttf"),
          "OpenSans-Regular": require("./assets/fonts/static/OpenSans-Regular.ttf"),
          "OpenSans-Medium": require("./assets/fonts/static/OpenSans-Medium.ttf"),
          "OpenSans-SemiBold": require("./assets/fonts/static/OpenSans-SemiBold.ttf"),
          "OpenSans-Bold": require("./assets/fonts/static/OpenSans-Bold.ttf"),
          "OpenSans-ExtraBold": require("./assets/fonts/static/OpenSans-ExtraBold.ttf"),

          // OpenSans Itálico
          "OpenSans-Italic": require("./assets/fonts/static/OpenSans-Italic.ttf"),
          "OpenSans-LightItalic": require("./assets/fonts/static/OpenSans-LightItalic.ttf"),
          "OpenSans-MediumItalic": require("./assets/fonts/static/OpenSans-MediumItalic.ttf"),
          "OpenSans-SemiBoldItalic": require("./assets/fonts/static/OpenSans-SemiBoldItalic.ttf"),
          "OpenSans-BoldItalic": require("./assets/fonts/static/OpenSans-BoldItalic.ttf"),

          // Roboto - Variações principais
          "Roboto-Thin": require("./assets/fonts/static/Roboto-Thin.ttf"),
          "Roboto-Light": require("./assets/fonts/static/Roboto-Light.ttf"),
          "Roboto-Regular": require("./assets/fonts/static/Roboto-Regular.ttf"),
          "Roboto-Medium": require("./assets/fonts/static/Roboto-Medium.ttf"),
          "Roboto-Bold": require("./assets/fonts/static/Roboto-Bold.ttf"),
          "Roboto-Black": require("./assets/fonts/static/Roboto-Black.ttf"),

          // Roboto Itálico
          "Roboto-Italic": require("./assets/fonts/static/Roboto-Italic.ttf"),
          "Roboto-LightItalic": require("./assets/fonts/static/Roboto-LightItalic.ttf"),
          "Roboto-MediumItalic": require("./assets/fonts/static/Roboto-MediumItalic.ttf"),
          "Roboto-BoldItalic": require("./assets/fonts/static/Roboto-BoldItalic.ttf"),

          // Se quiser usar as versões Condensed também:
          "OpenSans-Condensed-Bold": require("./assets/fonts/static/OpenSans_Condensed-Bold.ttf"),
          "Roboto-Condensed-Bold": require("./assets/fonts/static/Roboto_Condensed-Bold.ttf"),
        });
      } catch (e) {
        console.warn("Erro ao carregar fontes:", e);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      }
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return <View>{}</View>;
}
