import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAwmwUoixFXSMVp1vAwdYXXqCiE5bvwSq4",
  authDomain: "estudar-juntos.firebaseapp.com",
  projectId: "estudar-juntos",
  storageBucket: "estudar-juntos.firebasestorage.app",
  messagingSenderId: "672539762156",
  appId: "1:672539762156:web:30a64bad0cea88f00c34c9"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

console.log("🔥 Firebase conectado com sucesso!");