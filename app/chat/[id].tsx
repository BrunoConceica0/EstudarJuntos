import ModalDelivery from "@/components/views/ModalDelive";
import IDeliveryData from "@/interfaces/IDeliverData";
import IMessage from "@/interfaces/IMessage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";

export default function ChatScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const chatId = params.id || "1";
  const chatName = params.name || "Usuário";
  const chatAvatar = params.avatar || "https://via.placeholder.com/50";

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Olá! Vi que você tem o livro 'Dom Casmurro' disponível.",
        createdAt: new Date(2024, 10, 10, 12, 0),
        user: {
          _id: 2,
          name: chatName as string,
          avatar: chatAvatar as string,
        },
      },
      {
        _id: 2,
        text: "Olá! Sim, o livro está disponível. Você está preparando para qual vestibular?",
        createdAt: new Date(2024, 10, 10, 12, 5),
        user: {
          _id: 1,
          name: "Você",
          avatar: "https://via.placeholder.com/50",
        },
      },
    ]);
  }, [chatId]);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  const handleDeliverySubmit = (data: IDeliveryData) => {
    console.log("Dados da entrega:", data);

    // Adicionar mensagem no chat com os dados da entrega
    const deliveryMessage = {
      _id: Math.random().toString(),
      text: `📍 Proposta de entrega:\n📅 Data: ${data.date.toLocaleDateString(
        "pt-BR"
      )}\n⏰ Horário: ${data.time}\n📌 Local: ${data.location}`,
      createdAt: new Date(),
      user: {
        _id: 1,
        name: "Você",
        avatar: "https://via.placeholder.com/50",
      },
    };

    setMessages((prev) => GiftedChat.append(prev, [deliveryMessage]));
    setModalVisible(false); // Fecha o modal após enviar
  };

  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color="#007AFF" />
        </View>
      </Send>
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={styles.inputPrimary}
      />
    );
  };

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
        {/* BOTÃO COMBINAR ENTREGA */}
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

        <Pressable style={styles.headerButton}>
          <Ionicons name="ellipsis-vertical" size={24} color="#007AFF" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 1,
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
        />
      </KeyboardAvoidingView>

      {/* MODAL DE COMBINAR ENTREGA */}
      <ModalDelivery
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleDeliverySubmit}
      />
    </View>
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
    paddingTop: Platform.OS === "ios" ? 50 : 10,
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
    minHeight: 54,
  },
  inputPrimary: {
    alignItems: "center",
  },
});
