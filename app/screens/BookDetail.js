import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Share,
  ActivityIndicator,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";

// ✅ Supabase
const SUPABASE_URL = "https://eqzcchnbhsbxfeuvijwj.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxemNjaG5iaHNieGZldXZpandqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwMzg5MzgsImV4cCI6MjA3OTYxNDkzOH0.6uDOTs3Q4sUNd_OkmAuI_XOJKeF1Q6br6NJmJAkSu8o";
const API_URL = `${SUPABASE_URL}/rest/v1/books`;

export default function BookDetail() {
  const { bookData, id } = useLocalSearchParams();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [interestedUsers, setInterestedUsers] = useState([]);
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // BUSCAR LIVRO
  // =========================
  useEffect(() => {
    const loadBook = async () => {
      try {
        // Se veio por navegação
        if (bookData) {
          const parsed = JSON.parse(bookData);
          setBook(parsed);
          setLoading(false);
          return;
        }

        // Se veio por ID
        if (!id) {
          setBook(null);
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}?id=eq.${id}&select=*`, {
          headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
        });

        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          setBook(null);
        } else {
          setBook(data[0]);
        }

      } catch (error) {
        console.log("❌ Erro ao carregar livro:", error);
        setBook(null);
      } finally {
        setLoading(false);
      }
    };

    loadBook();
  }, [bookData, id]);

  // =========================
  // LIVROS SEMELHANTES
  // =========================
  useEffect(() => {
    if (!book) return;

    fetch(
      `${API_URL}?subject=eq.${book.subject}&id=neq.${book.id}&select=*`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setSimilarBooks(Array.isArray(data) ? data : []);
      })
      .catch(() => setSimilarBooks([]));
  }, [book]);

  // =========================
  // INTERESSADOS (mock por enquanto)
  // =========================
  useEffect(() => {
    if (!book) return;
    setInterestedUsers([]);
  }, [book]);

  const handleChat = () => {
    if (!book) return;

    const donorId = book.donorId || "0";
    const donorName = book.donorName || "Usuário";
    const avatar = book.image || "https://via.placeholder.com/50";

    router.push({
      pathname: `/chat/${donorId}`,
      params: { name: donorName, avatar },
    });
  };

  const handleShare = async () => {
    if (!book) return;

    await Share.share({
      message: `📚 Livro: ${book.title}\n✍️ Autor: ${book.author}\n\nVeja no app Estudar Juntos.`,
    });
  };

  const handleSolicitar = () => {
    alert("✅ Solicitação enviada para o doador!");
  };

  // =========================
  // RENDERIZAÇÃO
  // =========================

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando livro...</Text>
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.center}>
        <Text>❌ Erro ao carregar o livro</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "#007AFF", marginTop: 10 }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: book.image }} style={styles.image} />

      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.author}</Text>

      <View style={styles.tagRow}>
        <Text style={styles.condition}>{book.condition}</Text>
        <Text style={styles.subject}>{book.subject}</Text>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleSolicitar}
        >
          <MaterialIcons name="check-circle" size={20} color="#fff" />
          <Text style={styles.primaryText}>Solicitar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleChat}>
          <MaterialIcons name="chat" size={20} color="#007AFF" />
          <Text style={styles.secondaryText}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleShare}>
          <MaterialIcons name="share" size={20} color="#007AFF" />
          <Text style={styles.secondaryText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButtonBottom}
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={20} color="#fff" />
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>

      {interestedUsers.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Interessados</Text>

          {interestedUsers.map((user, index) => (
            <View style={styles.userCard} key={index}>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userCity}>{user.city}</Text>
            </View>
          ))}
        </>
      )}

      {similarBooks.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Livros semelhantes</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {similarBooks.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.similarCard}
                onPress={() =>
                  router.push({
                    pathname: "/screens/BookDetail",
                    params: {
                      id: String(item.id),
                      bookData: JSON.stringify(item),
                    },
                  })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.similarImage}
                />
                <Text style={styles.similarTitle} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.similarCondition}>
                  {item.condition}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
    </ScrollView>
  );
}

// ============================
// ESTILOS
// ============================
const styles = StyleSheet.create({
  container: { flex: 1, padding: 14, backgroundColor: "#fff" },

  image: {
    width: "100%",
    height: 280,
    borderRadius: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
  },

  author: {
    fontSize: 16,
    color: "#444",
  },

  tagRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },

  condition: {
    color: "#007AFF",
    fontWeight: "600",
  },

  subject: {
    color: "#666",
  },

  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 15,
  },

  primaryButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 6,
    justifyContent: "center",
  },

  primaryText: {
    color: "#fff",
    marginLeft: 6,
    fontWeight: "bold",
  },

  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    padding: 10,
    borderRadius: 8,
    marginLeft: 6,
  },

  secondaryText: {
    color: "#007AFF",
    marginLeft: 4,
  },

  backButtonBottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
  },

  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 6,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 12,
  },

  userCard: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
    marginBottom: 6,
  },

  userName: {
    fontWeight: "bold",
  },

  userCity: {
    fontSize: 13,
    color: "#555",
  },

  similarCard: {
    width: 130,
    marginRight: 12,
  },

  similarImage: {
    width: "100%",
    height: 160,
    borderRadius: 8,
  },

  similarTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },

  similarCondition: {
    fontSize: 12,
    color: "#666",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});