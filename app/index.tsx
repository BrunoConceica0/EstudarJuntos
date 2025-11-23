import { Redirect } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const { user, loading } = useAuth();

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#3A7DFF" />
      </View>
    );
  }

  // Se usuário está logado, redireciona para Home
  // Se não está logado, redireciona para Welcome
  return <Redirect href={user ? "/(tabs)/Home" : "/auth/Welcome"} />;
}
