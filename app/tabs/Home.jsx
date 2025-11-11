import { typography, utility } from "@/style/index";
import { Text, View } from "react-native";
import LoadingScreen from "../../components/Rollingborder";
const Home = () => {
  return (
    <View style={utility.container}>
      <Text style={typography.title}>Home</Text>
      <LoadingScreen />
    </View>
  );
};

export default Home;
