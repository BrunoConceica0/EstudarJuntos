import IMessage from "@/interfaces/IMessage";
import { MaterialIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { GiftedChat, InputToolbar, Send } from "react-native-gifted-chat";

export default function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
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
    return (
      <InputToolbar
        {...props}
        containerStyle={styles.inputToolbar}
        primaryStyle={styles.inputPrimary}
      />
    );
  };

  return (
    <View style={styles.wrapper}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <GiftedChat
          messages={messages}
          onSend={onSend}
          user={{
            _id: 1,
            name: "Você",
            avatar: "https://placeimg.com/140/140/any",
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
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  wrapper: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  textInput: {
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingTop: Platform.OS === "ios" ? 8 : 2,
  },
});
