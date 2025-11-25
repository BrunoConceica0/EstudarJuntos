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

const BookDonationScreen = () => {
  // Estados do formulário
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");

  // Estados da lista
  const [donatedBooks, setDonatedBooks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // Função para salvar/editar livro
  const handleSaveBook = () => {
    if (!bookTitle || !author || !condition) {
      Alert.alert(
        "Atenção",
        "Por favor, preencha todos os campos obrigatórios!"
      );
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

    if (editingBook) {
      // Editar livro existente
      setDonatedBooks((prevBooks) =>
        prevBooks.map((book) => (book.id === editingBook.id ? bookData : book))
      );
      Alert.alert("Sucesso!", `Livro "${bookTitle}" atualizado!`);
    } else {
      // Adicionar novo livro
      setDonatedBooks((prevBooks) => [bookData, ...prevBooks]);
      Alert.alert("Sucesso!", `Livro "${bookTitle}" cadastrado para doação!`);
    }

    resetForm();
  };

  // Função para editar livro
  const handleEditBook = (book) => {
    setEditingBook(book);
    setBookTitle(book.title);
    setAuthor(book.author);
    setCondition(book.condition);
    setDescription(book.description || "");
    setModalVisible(true);
  };

  // Função para excluir livro
  const handleDeleteBook = (bookId) => {
    setDonatedBooks((prevBooks) =>
      prevBooks.filter((book) => book.id !== bookId)
    );
  };

  // Resetar formulário
  const resetForm = () => {
    setBookTitle("");
    setAuthor("");
    setCondition("");
    setDescription("");
    setEditingBook(null);
    setModalVisible(false);
  };

  // Abrir formulário para novo livro
  const openDonationForm = () => {
    resetForm();
    setModalVisible(true);
  };

  // Renderizar cada item da lista
  const renderBookItem = ({ item }) => (
    <BookCard
      book={item}
      onPress={() =>
        Alert.alert(
          "Detalhes do Livro",
          `📖 ${item.title}\n\n✍️ Autor: ${item.author}\n📊 Condição: ${
            item.condition
          }\n${
            item.description ? `\n📝 Descrição: ${item.description}\n` : ""
          }\n📅 Cadastrado em: ${item.date}`
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

      {/* Contador Simples */}
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {donatedBooks.length}{" "}
          {donatedBooks.length === 1
            ? "livro cadastrado"
            : "livros cadastrados"}
        </Text>
      </View>

      {/* Lista de Livros */}
      {donatedBooks.length > 0 ? (
        <FlatList
          data={donatedBooks}
          renderItem={renderBookItem}
          keyExtractor={(item) => item.id}
          style={styles.bookList}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateEmoji}>📖</Text>
          <Text style={styles.emptyStateTitle}>Nenhum livro cadastrado</Text>
          <Text style={styles.emptyStateSubtitle}>
            Toque no botão "+" abaixo para doar seu primeiro livro!
          </Text>
        </View>
      )}

      {/* Botão Flutuante */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={openDonationForm}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>

      {/* Formulário */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={resetForm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingBook ? "✏️ Editar Livro" : "📚 Doar Livro"}
              </Text>
              <TouchableOpacity onPress={resetForm} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalBody}
              showsVerticalScrollIndicator={false}
            >
              {/* Formulário Simples */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Título do Livro *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Harry Potter e a Pedra Filosofal"
                  value={bookTitle}
                  onChangeText={setBookTitle}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Autor *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: J.K. Rowling"
                  value={author}
                  onChangeText={setAuthor}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Condição do Livro *</Text>
                <View style={styles.conditionButtons}>
                  {[
                    "Novo",
                    "Usado - Ótimo",
                    "Usado - Bom",
                    "Usado - Regular",
                  ].map((cond) => (
                    <TouchableOpacity
                      key={cond}
                      style={[
                        styles.conditionButton,
                        condition === cond && styles.conditionButtonSelected,
                      ]}
                      onPress={() => setCondition(cond)}
                    >
                      <Text
                        style={[
                          styles.conditionButtonText,
                          condition === cond &&
                            styles.conditionButtonTextSelected,
                        ]}
                      >
                        {cond}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Descrição (opcional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Conte um pouco sobre o livro..."
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                />
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveBook}
              >
                <Text style={styles.saveButtonText}>
                  {editingBook ? "💾 Salvar Alterações" : "✅ Cadastrar Doação"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#007AFF",
    padding: 25,
    paddingTop: 60,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    opacity: 0.9,
  },
  counterContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  counterText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
    textAlign: "center",
  },
  bookList: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 100,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#666",
    textAlign: "center",
    marginBottom: 8,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    lineHeight: 22,
  },
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
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 1000,
  },
  // Estilo
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
  },

  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  conditionButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  conditionButton: {
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e9ecef",
    marginBottom: 10,
    minWidth: "48%",
    alignItems: "center",
  },
  conditionButtonSelected: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  conditionButtonText: {
    color: "#666",
    fontWeight: "500",
    fontSize: 14,
  },
  conditionButtonTextSelected: {
    color: "white",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#007AFF",
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  cancelButtonText: {
    color: "#666",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default BookDonationScreen;
