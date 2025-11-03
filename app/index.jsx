import TabBar from "@/components/TabBar";
import LoandigScreen from "@/views/log/loadingScreen";
import Message from "@/views/message/Message";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true); //vai comecar como "carregando"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(true); // apos 2 segundos, carregamento termina
    }, 200000);

    return () => clearTimeout(timer); //limpa o timer se o componente for desmontado
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoandigScreen />
      ) : (
        <>
          <Message />
          <View style={styles.tabBarContainer}></View>
          <TabBar />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
