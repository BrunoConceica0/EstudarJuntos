import { utility } from "@/style/index";
import { Image, View } from "react-native";
import Border from "@/components/common/Rollingborder";
export default function loadingScreen() {
  return (
    <View style={[utility.container, { gap: 75 }]}>
      <Image
        source={require("../../assets/image/logo.png")}
        style={{
          width: 380,
          height: 220,
          resizeMode: "contain",
        }}
      />
      <Border />
    </View>
  );
}
