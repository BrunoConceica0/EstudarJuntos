import { StyleSheet, View } from "react-native";
import Svg, { Defs, Image, Pattern, Rect, Use } from "react-native-svg";

export default function IconLogo() {
  const base64Image =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0QAAAHeCAYAAAC7e8siAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAOOASURBVHgB7P17tGZXdR8Kzrm/8613lSQkoUcBQmBeKgluAghbhWMMGcYxYF83Gd2jkZOOPe6wRxty07bv6LZLMslN7IwYu9vp9vhJAf/fnpfs+...";

  return (
    <View style={styles.container}>
      <Svg width="387" height="221" viewBox="0 0 387 221">
        <Defs>
          <Pattern
            id="pattern0_37_7"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <Use
              href="#image0_37_7"
              transform="matrix(0.00122712 0 0 0.00214885 0.0219476 0.00904977)"
            />
          </Pattern>
          <Image
            id="image0_37_7"
            width="836"
            height="478"
            preserveAspectRatio="none"
            href={base64Image}
          />
        </Defs>
        <Rect width="387" height="221" fill="url(#pattern0_37_7)" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 387,
    height: 221,
  },
});
