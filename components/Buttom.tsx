import IButtom from "@/interfaces/IButtom";
import { cores, typography, utility } from "@/style";
import { Pressable, Text } from "react-native";

export default function Btn({ title, onPress, disabled }: IButtom) {
  return (
    <Pressable
      style={({ pressed }) => [
        utility.button,
        cores.primary,
        pressed && utility.buttonPressed,
        disabled && utility.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {({ pressed }) => (
        <Text
          style={[
            typography.textXl,
            cores.btnText,
            pressed && typography.textXlB,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
