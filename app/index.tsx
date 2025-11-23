import { Redirect } from "expo-router";

export default function Index() {
  // Redirecionar para a tela de Welcome
  // Futuramente, você pode verificar se o usuário está logado
  // e redirecionar para /Home se estiver autenticado
  return <Redirect href="/auth/Welcome" />;
}
