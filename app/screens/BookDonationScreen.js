import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  FlatList,
  Modal,
} from "react-native";
import BookCard from "@/components/BookCard";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ===================
// SUPABASE CONFIG
// ===================
const SUPABASE_URL = "https://eqzcchnbhsbxfeuvijwj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxemNjaG5iaHNieGZldXZpandqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzg5MzgsImV4cCI6MjA3OTYxNDkzOH0.6uDOTs3Q4sUNd_OkmAuI_XOJKeF1Q6br6NJmJAkSu8o";
const SUPABASE_INSERT_URL = `${SUPABASE_URL}/rest/v1/books`;

const BookDonationScreen = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");

  const [donatedBooks, setDonatedBooks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // ============================
  // ENVIO PARA O SUPABASE
  // ============================
  const enviarLivroSupabase = async (livro) => {
    try {
      const usuarioSalvo = await AsyncStorage.getItem("usuario");
      const usuario = usuarioSalvo ? JSON.parse(usuarioSalvo) : null;

      if (!usuario) {
        Alert.alert("Erro", "Usuário não encontrado. Faça login novamente.");
        return false;
      }

      const livroParaBanco = {
        title: livro.title,
        author: livro.author,
        subject: "Geral",
        condition: livro.condition,
        image:
          "https://eqzcchnbhsbxfeuvijwj.supabase.co/storage/v1/object/public/books/FundamentosFisica.jpg",
        latitude: -23.5629,
        longitude: -46.6544,
        donor_name: usuario.nome,
        donor_id: usuario.email,
      };

      const res = await fetch(SUPABASE_INSERT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify(livroParaBanco),
      });

      if (!res.ok) {
        const erro = await res.text();
        console.log("Erro Supabase:", erro);
        Alert.alert("Erro", "Falha ao salvar no banco 😞");
        return false;
      }

      console.log("✅ Livro enviado ao Supabase!");
      return true;

    } catch (error) {
      console.log("Erro:", error);
      Alert.alert("Erro", "Não foi possível conectar ao banco.");
      return false;
    }
  };

  // ============================
  // SALVAR LIVRO
  // ============================
  const handleSaveBook = async () => {
    if (!bookTitle || !author || !condition) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    const bookData = {
      id: editingBook ? editingBook.id : Date.now().toString(),
      title: bookTitle,
      author: author,
      condition: condition,
      description: description,
      date: editingBook
        ? editingBook.date
        : new Date().toLocaleDateString("pt-BR"),
    };

    const enviado = await enviarLivroSupabase(bookData);

    if (!enviado) return;

    if (editingBook) {
      setDonatedBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === editingBook.id ? bookData : book
        )
      );
    } else {
      setDonatedBooks((prevBooks) => [bookData, ...prevBooks]);
    }

    Alert.alert("Sucesso!", "Livro enviado ao banco com sucesso ✅");
    resetForm();
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setBookTitle(book.title);
    setAuthor(book.author);
    setCondition(book.condition);
    setDescription(book.description || "");
    setModalVisible(true);
  };

  const handleDeleteBook = (bookId) => {
    setDonatedBooks((prevBooks) =>
      prevBooks.filter((book) => book.id !== bookId)
    );
  };

  const resetForm = () => {
    setBookTitle("");
    setAuthor("");
    setCondition("");
    setDescription("");
    setEditingBook(null);
    setModalVisible(false);
  };

  const openDonationForm = () => {
    resetForm();
    setModalVisible(true);
  };

  const renderBookItem = ({ item }) => (
    <BookCard
      book={item}
      onPress={() =>
        Alert.alert(
          "Detalhes do Livro",
          `📖 ${item.title}\n\n✍️ Autor: ${item.author}\n📊 Condição: ${
            item.condition
          }\n${
            item.description ? `\n📝 ${item.description}` : ""
          }\n📅 Data: ${item.date}`
        )
      }
      onEdit={handleEditBook}
      onDelete={() => handleDeleteBook(item.id)}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 Doe Livros</Text>
        <Text style={styles.subtitle}>
          Compartilhe conhecimento com a comunidade
        </Text>
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {donatedBooks.length} livros cadastrados
        </Text>
      </View>

      {donatedBooks.length > 0 ? (
        <FlatList
          data={donatedBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateEmoji}>📖</Text>
          <Text>Nenhum livro cadastrado</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={openDonationForm}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      {/* MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={resetForm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingBook ? "Editar Livro" : "Doar Livro"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Título"
              value={bookTitle}
              onChangeText={setBookTitle}
            />

            <TextInput
              style={styles.input}
              placeholder="Autor"
              value={author}
              onChangeText={setAuthor}
            />

            <View style={styles.conditionButtons}>
              {["Novo", "Usado - Ótimo", "Usado - Bom"].map((cond) => (
                <TouchableOpacity
                  key={cond}
                  style={[
                    styles.conditionButton,
                    condition === cond && styles.conditionButtonSelected,
                  ]}
                  onPress={() => setCondition(cond)}
                >
                  <Text>{cond}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição"
              value={description}
              onChangeText={setDescription}
              multiline
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveBook}
            >
              <Text style={styles.saveButtonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={resetForm}>
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// ========================= STYLES
const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#007AFF",
    padding: 30,
    alignItems: "center",
  },
  title: { fontSize: 26, color: "#fff", fontWeight: "bold" },
  subtitle: { color: "#fff" },
  counterContainer: { padding: 15 },
  counterText: { textAlign: "center" },
  emptyState: { alignItems: "center", marginTop: 40 },
  emptyStateEmoji: { fontSize: 60 },

  floatingButton: {
    position: "absolute",
    right: 25,
    bottom: 30,
    backgroundColor: "#007AFF",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  textArea: {
    height: 80,
  },
  conditionButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  conditionButton: {
    padding: 10,
    margin: 4,
    borderWidth: 1,
    borderRadius: 6,
  },
  conditionButtonSelected: {
    backgroundColor: "#4CAF50",
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default BookDonationScreen;