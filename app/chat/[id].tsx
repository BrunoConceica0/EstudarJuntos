import ModalDelivery from "@/components/views/ModalDelivery";
import IDeliveryData from "@/interfaces/IDeliverData";
import IMessage from "@/interfaces/IMessage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";
import { SafeAreaView } from "react-native-safe-area-context";

//  FIREBASE IMPORTS
import { db } from "@/src/config/firebase";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const chatId = params.id || "1";
  const chatName = params.name || "Usuário";
  const chatAvatar = params.avatar || "https://via.placeholder.com/50";

  //  TEMPO REAL: Carregar mensagens do Firebase
  useEffect(() => {
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    // Listener em tempo real - atualiza automaticamente quando há novas mensagens
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const firebaseMessages = snapshot.docs.map((doc) => {
          const data = doc.data();

          // Converter timestamp do Firebase para Date
          const createdAt = data.createdAt
            ? data.createdAt.toDate()
            : new Date();

          return {
            _id: doc.id,
            text: data.text,
            createdAt: createdAt,
            user: {
              _id: data.user._id,
              name: data.user.name,
              avatar: data.user.avatar,
            },
          };
        });

        setMessages(firebaseMessages);
        setLoading(false);
      },
      (error) => {
        console.error("Erro ao carregar mensagens:", error);
        Alert.alert("Erro", "Não foi possível carregar as mensagens.");
        setLoading(false);
      }
    );

    // Cleanup: desinscrever quando o componente for desmontado
    return () => unsubscribe();
  }, [chatId]);

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      const message = newMessages[0];

      try {
        // Adicionar mensagem no Firestore
        await addDoc(collection(db, `chats/${chatId}/messages`), {
          text: message.text,
          createdAt: serverTimestamp(),
          user: {
            _id: 1,
            name: "Você",
            avatar: "https://via.placeholder.com/50",
          },
        });

        await setDoc(
          doc(db, `chats/${chatId}`),
          {
            lastMessage: message.text,
            lastMessageTime: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
          { merge: true } // Merge para não sobrescrever outros campos
        );
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        Alert.alert("Erro", "Não foi possível enviar a mensagem.");
      }
    },
    [chatId]
  );

  const handleDeliverySubmit = async (data: IDeliveryData) => {
    console.log("Dados da entrega:", data);

    const deliveryMessage = {
      text: `📦 Proposta de entrega:\n📅 Data: ${data.date.toLocaleDateString(
        "pt-BR"
      )}\n⏰ Horário: ${data.time}\n📌 Local: ${data.location}`,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "Você",
        avatar: "https://via.placeholder.com/50",
      },
    };

    try {
      // Enviar proposta como mensagem especial
      await addDoc(collection(db, `chats/${chatId}/messages`), {
        text: deliveryMessage.text,
        createdAt: serverTimestamp(),
        user: deliveryMessage.user,
        type: "delivery_proposal", // Tipo especial para identificar
        deliveryData: {
          date: data.date.toISOString(),
          time: data.time,
          location: data.location,
        },
      });

      setModalVisible(false);
      Alert.alert("Sucesso", "Proposta de entrega enviada!");
    } catch (error) {
      console.error("Erro ao enviar proposta:", error);
      Alert.alert("Erro", "Não foi possível enviar a proposta.");
    }
  };

  // 🎨 CUSTOMIZAR BOTÃO DE ENVIAR
  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color="#007AFF" />
        </View>
      </Send>
    );
  };

  // 🎨 CUSTOMIZAR BARRA DE INPUT
  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={styles.inputPrimary}
      />
    );
  };

  // 📱 HEADER CUSTOMIZADO
  const renderHeader = () => (
    <View style={styles.header}>
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="chevron-back" size={28} color="#007AFF" />
      </Pressable>

      <Image
        source={{ uri: chatAvatar as string }}
        style={styles.headerAvatar}
      />

      <Text style={styles.headerName}>{chatName}</Text>

      <View style={styles.headerActions}>
        {/* Botão de combinar entrega */}
        <Pressable
          style={({ pressed }) => [
            styles.deliveryButton,
            pressed && styles.deliveryButtonPressed,
          ]}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="location" size={18} color="#fff" />
          <Text style={styles.deliveryButtonText}>Combinar</Text>
        </Pressable>

        {/* Menu de opções */}
        <Pressable style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#007AFF" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      {renderHeader()}

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 1, // ⚠️ Substituir pelo ID do usuário logado
            name: "Você",
            avatar: "https://via.placeholder.com/50",
          }}
          placeholder="Digite uma mensagem..."
          alwaysShowSend
          showUserAvatar
          renderSend={renderSend}
          renderInputToolbar={renderInputToolbar}
          renderUsernameOnMessage={true}
          locale="pt-br"
          dateFormat="DD/MM/YYYY"
          timeFormat="HH:mm"
          maxComposerHeight={100}
          minComposerHeight={40}
          messagesContainerStyle={styles.messagesContainer}
          listViewProps={{ style: styles.listView } as any}
          bottomOffset={Platform.OS === "ios" ? 40 : 0}
          isLoadingEarlier={loading}
          renderAvatarOnTop={true}
        />
      </KeyboardAvoidingView>

      {/* Modal de combinar entrega */}
      <ModalDelivery
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleDeliverySubmit}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  backButton: {
    padding: 5,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 10,
    backgroundColor: "#E5E5E5",
  },
  headerName: {
    flex: 1,
    fontSize: 17,
    fontWeight: "600",
    color: "#000",
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  deliveryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3A7DFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  deliveryButtonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  deliveryButtonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  headerButton: {
    padding: 5,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    paddingBottom: 10,
  },
  listView: {
    flex: 1,
  },
  sendButton: {
    marginRight: 10,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 44,
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    backgroundColor: "#fff",
    paddingTop: 6,
    paddingBottom: Platform.OS === "ios" ? 10 : 6,
    minHeight: 54,
  },
  inputPrimary: {
    alignItems: "center",
  },
});
