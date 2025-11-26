import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TextInput,
  Modal,
  FlatList,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // guardar os dados dos usuários mesmo após fechar app
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

const TelaPerfil = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [modalVisivel, setModalVisivel] = useState(false);
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [meusLivros, setMeusLivros] = useState([]);
  const [livrosFavoritos, setLivrosFavoritos] = useState([]);
  const [abaAtiva, setAbaAtiva] = useState("perfil"); // 'perfil', 'meusLivros', 'favoritos'
  const navegacao = useNavigation();

  // Debug: Log do usuário
  useEffect(() => {
    console.log("=== DEBUG PROFILE SCREEN ===");
    console.log("Dados do usuário:", user);
    console.log("Nome:", user?.name);
    console.log("Email:", user?.email);
  }, [user]);

  // Carregar livros do usuário
  const carregarMeusLivros = async () => {
    try {
      const livrosSalvos = await AsyncStorage.getItem("meusLivros");
      if (livrosSalvos) {
        setMeusLivros(JSON.parse(livrosSalvos));
      } else {
        const livrosExemplo = [
          {
            id: 1,
            titulo: "Dom Casmurro",
            autor: "Machado de Assis",
            status: "disponível",
          },
          {
            id: 2,
            titulo: "1984",
            autor: "George Orwell",
            status: "emprestado",
          },
          {
            id: 3,
            titulo: "O Pequeno Príncipe",
            autor: "Antoine de Saint-Exupéry",
            status: "disponível",
          },
        ];
        setMeusLivros(livrosExemplo);
        await AsyncStorage.setItem("meusLivros", JSON.stringify(livrosExemplo));
      }
    } catch (erro) {
      console.log("Erro ao carregar livros:", erro);
    }
  };

  // Carregar favoritos
  const carregarFavoritos = async () => {
    try {
      const favoritosSalvos = await AsyncStorage.getItem("livrosFavoritos");
      if (favoritosSalvos) {
        setLivrosFavoritos(JSON.parse(favoritosSalvos));
      } else {
        const favoritosExemplo = [
          { id: 1, titulo: "Harry Potter", autor: "J.K. Rowling" },
          { id: 2, titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien" },
          { id: 3, titulo: "Orgulho e Preconceito", autor: "Jane Austen" },
        ];
        setLivrosFavoritos(favoritosExemplo);
        await AsyncStorage.setItem(
          "livrosFavoritos",
          JSON.stringify(favoritosExemplo)
        );
      }
    } catch (erro) {
      console.log("Erro ao carregar favoritos:", erro);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      carregarMeusLivros();
      carregarFavoritos();
    }, [])
  );

  // FUNÇÃO DE LOGOUT
  const handleSair = async () => {
    // No web, Alert.alert não funciona, então usamos window.confirm
    if (Platform.OS === 'web') {
      const confirmed = window.confirm("Tem certeza que deseja sair?");
      if (confirmed) {
        try {
          await signOut();
          router.replace("/auth/login");
        } catch (erro) {
          window.alert("Erro: Não foi possível sair da conta");
        }
      }
    } else {
      // No mobile (Android/iOS), usamos Alert.alert
      Alert.alert("Sair da Conta", "Tem certeza que deseja sair?", [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              await signOut();
              router.replace("/auth/login");
            } catch (erro) {
              console.log("Erro ao fazer logout:", erro);
              Alert.alert("Erro", "Não foi possível sair da conta.");
            }
          },
        },
      ]);
    }
  };

  // FUNÇÃO EDITAR PERFIL
  const handleEditarPerfil = () => {
    setEditandoUsuario({
      nome: user?.name || "",
      email: user?.email || "",
    });
    setModalVisivel(true);
  };

  const salvarPerfil = async () => {
    try {
      // TODO: Implementar atualização do perfil no AuthContext
      setModalVisivel(false);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    } catch (erro) {
      Alert.alert("Erro", "Não foi possível salvar as alterações");
    }
  };

  // FUNÇÃO MEUS LIVROS
  const handleMeusLivros = () => {
    setAbaAtiva("meusLivros");
  };

  const removerLivro = async (idLivro) => {
    const livrosAtualizados = meusLivros.filter(
      (livro) => livro.id !== idLivro
    );
    setMeusLivros(livrosAtualizados);
    await AsyncStorage.setItem("meusLivros", JSON.stringify(livrosAtualizados));
    Alert.alert("Livro removido", "O livro foi removido da sua coleção");
  };

  // FUNÇÃO FAVORITOS
  const handleFavoritos = () => {
    setAbaAtiva("favoritos");
  };

  const removerFavorito = async (idLivro) => {
    const favoritosAtualizados = livrosFavoritos.filter(
      (livro) => livro.id !== idLivro
    );
    setLivrosFavoritos(favoritosAtualizados);
    await AsyncStorage.setItem(
      "livrosFavoritos",
      JSON.stringify(favoritosAtualizados)
    );
    Alert.alert(
      "Removido dos favoritos",
      "Livro removido da lista de favoritos"
    );
  };

  // Voltar para o perfil
  const handleVoltarAoPerfil = () => {
    setAbaAtiva("perfil");
  };

  // Renderizar item da lista de livros
  const renderizarItemLivro = ({ item, ehFavorito = false }) => (
    <View style={estilos.itemLivro}>
      <View style={estilos.infoLivro}>
        <Text style={estilos.tituloLivro}>{item.titulo}</Text>
        <Text style={estilos.autorLivro}>{item.autor}</Text>
        {item.status && (
          <Text style={estilos.statusLivro}>Status: {item.status}</Text>
        )}
      </View>
      <TouchableOpacity
        style={estilos.botaoRemover}
        onPress={() =>
          ehFavorito ? removerFavorito(item.id) : removerLivro(item.id)
        }
      >
        <Ionicons name="trash-outline" size={20} color="#ff4444" />
      </TouchableOpacity>
    </View>
  );

  // TELA DE MEUS LIVROS
  const renderizarTelaMeusLivros = () => (
    <View style={estilos.containerAba}>
      <TouchableOpacity
        style={estilos.botaoVoltar}
        onPress={handleVoltarAoPerfil}
      >
        <Ionicons name="arrow-back" size={20} color="#007bff" />
        <Text style={estilos.textoBotaoVoltar}>Voltar ao Perfil</Text>
      </TouchableOpacity>

      <Text style={estilos.tituloAba}>Meus Livros ({meusLivros.length})</Text>

      <FlatList
        data={meusLivros}
        renderItem={renderizarItemLivro}
        keyExtractor={(item) => item.id.toString()}
        style={estilos.listaLivros}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  // TELA DE FAVORITOS
  const renderizarTelaFavoritos = () => (
    <View style={estilos.containerAba}>
      <TouchableOpacity
        style={estilos.botaoVoltar}
        onPress={handleVoltarAoPerfil}
      >
        <Ionicons name="arrow-back" size={20} color="#007bff" />
        <Text style={estilos.textoBotaoVoltar}>Voltar ao Perfil</Text>
      </TouchableOpacity>

      <Text style={estilos.tituloAba}>
        Meus Favoritos ({livrosFavoritos.length})
      </Text>

      <FlatList
        data={livrosFavoritos}
        renderItem={({ item }) =>
          renderizarItemLivro({ item, ehFavorito: true })
        }
        keyExtractor={(item) => item.id.toString()}
        style={estilos.listaLivros}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  // EDITAR PERFIL
  const renderizarModalEditarPerfil = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisivel}
      onRequestClose={() => setModalVisivel(false)}
    >
      <View style={estilos.containerModal}>
        <View style={estilos.conteudoModal}>
          <Text style={estilos.tituloModal}>Editar Perfil</Text>

          <TextInput
            style={estilos.input}
            placeholder="Nome"
            value={editandoUsuario?.nome || ""}
            onChangeText={(texto) =>
              setEditandoUsuario({ ...editandoUsuario, nome: texto })
            }
          />

          <TextInput
            style={estilos.input}
            placeholder="Email"
            value={editandoUsuario?.email || ""}
            onChangeText={(texto) =>
              setEditandoUsuario({ ...editandoUsuario, email: texto })
            }
            keyboardType="email-address"
          />

          <View style={estilos.botoesModal}>
            <TouchableOpacity
              style={[estilos.botaoModal, estilos.botaoCancelar]}
              onPress={() => setModalVisivel(false)}
            >
              <Text style={estilos.textoBotaoCancelar}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[estilos.botaoModal, estilos.botaoSalvar]}
              onPress={salvarPerfil}
            >
              <Text style={estilos.textoBotaoSalvar}>Salvar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // PERFIL PRINCIPAL
  const renderizarTelaPerfil = () => (
    <>
      {/* CABEÇALHO */}
      <View style={estilos.cabecalhoPerfil}>
        <View style={estilos.avatar}>
          <Text style={estilos.textoAvatar}>
            {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
          </Text>
        </View>

        <Text style={estilos.nomeUsuario}>{user?.name || "Usuário"}</Text>
        <Text style={estilos.emailUsuario}>
          {user?.email || "email@exemplo.com"}
        </Text>

        <View style={estilos.estatisticas}>
          <View style={estilos.estatistica}>
            <Text style={estilos.numeroEstatistica}>
              {user?.booksDonated || 0}
            </Text>
            <Text style={estilos.rotuloEstatistica}>Livros Doados</Text>
          </View>
          <View style={estilos.estatistica}>
            <Text style={estilos.numeroEstatistica}>
              {user?.booksReceived || 0}
            </Text>
            <Text style={estilos.rotuloEstatistica}>Livros Recebidos</Text>
          </View>
        </View>
      </View>

      {/* MENU */}
      <ScrollView style={estilos.conteudo} showsVerticalScrollIndicator={false}>
        <View style={estilos.secaoMenu}>
          <Text style={estilos.tituloSecao}>Minha Conta</Text>

          <TouchableOpacity
            style={estilos.itemMenu}
            onPress={handleEditarPerfil}
          >
            <Ionicons name="person-outline" size={22} color="#666" />
            <Text style={estilos.textoMenu}>Editar Perfil</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={estilos.itemMenu} onPress={handleMeusLivros}>
            <Ionicons name="book-outline" size={22} color="#666" />
            <Text style={estilos.textoMenu}>Meus Livros</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={estilos.itemMenu} onPress={handleFavoritos}>
            <Ionicons name="heart-outline" size={22} color="#666" />
            <Text style={estilos.textoMenu}>Favoritos</Text>
            <Ionicons name="chevron-forward" size={18} color="#999" />
          </TouchableOpacity>
        </View>

        {/* BOTÃO DE SAIR */}
        <TouchableOpacity style={estilos.botaoSair} onPress={handleSair}>
          <Ionicons name="log-out-outline" size={22} color="#ff4444" />
          <Text style={estilos.textoBotaoSair}>Sair da Conta</Text>
        </TouchableOpacity>

        {/* Doar Livro */}
        <TouchableOpacity style={estilos.botaoDoar}>
          <Ionicons name="book" size={20} color="white" />
          <Text style={estilos.textoBotaoDoar}>Doar um Livro</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );

  return (
    <View style={estilos.container}>
      {abaAtiva === "perfil" && renderizarTelaPerfil()}
      {abaAtiva === "meusLivros" && renderizarTelaMeusLivros()}
      {abaAtiva === "favoritos" && renderizarTelaFavoritos()}
      {renderizarModalEditarPerfil()}
    </View>
  );
};

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  cabecalhoPerfil: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  textoAvatar: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  nomeUsuario: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  emailUsuario: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  estatisticas: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  estatistica: {
    alignItems: "center",
  },
  numeroEstatistica: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007bff",
  },
  rotuloEstatistica: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  conteudo: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  secaoMenu: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  itemMenu: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  textoMenu: {
    flex: 1,
    fontSize: 16,
    color: "#333",
    marginLeft: 12,
  },
  botaoSair: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ff4444",
  },
  textoBotaoSair: {
    color: "#ff4444",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  botaoDoar: {
    backgroundColor: "#007bff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  textoBotaoDoar: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },

  containerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  conteudoModal: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    width: "80%",
  },
  tituloModal: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  botoesModal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  botaoModal: {
    padding: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: "center",
  },
  botaoCancelar: {
    backgroundColor: "#f8f9fa",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  botaoSalvar: {
    backgroundColor: "#007bff",
  },
  textoBotaoCancelar: {
    color: "#333",
    fontWeight: "600",
  },
  textoBotaoSalvar: {
    color: "white",
    fontWeight: "600",
  },
  // Telas de Aba
  containerAba: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  botaoVoltar: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  textoBotaoVoltar: {
    color: "#007bff",
    fontSize: 16,
    marginLeft: 8,
  },
  tituloAba: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  listaLivros: {
    flex: 1,
  },
  itemLivro: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoLivro: {
    flex: 1,
  },
  tituloLivro: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  autorLivro: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  statusLivro: {
    fontSize: 12,
    color: "#007bff",
    marginTop: 4,
  },
  botaoRemover: {
    padding: 8,
  },
});

export default TelaPerfil;
