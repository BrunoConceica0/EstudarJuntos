import { cores } from "@/style/index";
import Message from "@/views/message/Message";

import { View } from "react-native";

export default function Index() {
  return (
    <View style={cores.bg}>
      <Message />
    </View>
  );
}
