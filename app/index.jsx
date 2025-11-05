import LoadingScreen from "@/components/Rollingborder";
import Message from "@/views/message/Message";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <LoadingScreen /> : <Message />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
});