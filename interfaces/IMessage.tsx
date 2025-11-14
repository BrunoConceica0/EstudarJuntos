// src/interfaces/IMessage.ts
export default interface IMessage {
  _id: string | number; // ✅ Aceita tanto string quanto number
  text: string;
  createdAt: Date | number; // ✅ Aceita Date ou timestamp
  user: {
    _id: string | number;
    name: string;
    avatar: string;
  };
}
