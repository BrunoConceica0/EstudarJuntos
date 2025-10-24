import Message from "@/components/message/index";
import { cores } from "@/style/index";
import { View } from "react-native";

export default function Index() {
  return (
    <View style={cores.secondary}>
      <Message />
    </View>
  );
}
