import IMessage from "@/interfaces/IMessage"; // Ajuste o caminho conforme necessário
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";

export default function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    // Mensagens de exemplo
    setMessages([
      {
        _id: 1,
        text: "Olá! Vi que você tem o livro 'Dom Casmurro' disponível.",
        createdAt: new Date(2024, 0, 1, 12, 0),
        user: {
          _id: 2,
          name: "Maria Santos",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  }, []);

  // Customizar o botão de enviar
  const renderSend = (props: any) => {
    return (
      <Send {...props}>
        <View style={styles.sendButton}>
          <MaterialIcons name="send" size={24} color="#007AFF" />
        </View>
      </Send>
    );
  };

  // Customizar a barra de input
  const renderInputToolbar = (props: any) => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{
          _id: 1,
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
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sendButton: {
    marginRight: 10,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    backgroundColor: "#fff",
    paddingTop: 6,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === "ios" ? 8 : 2,
  },
});
