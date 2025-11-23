import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, initializeAuth } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

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

// Configurar Auth com persistência apenas para plataformas nativas
let auth;
if (Platform.OS === 'web') {
  // No web, usar getAuth padrão (já tem persistência automática)
  auth = getAuth(app);
} else {
  // No mobile, usar initializeAuth com AsyncStorage
  try {
    const { getReactNativePersistence } = require('firebase/auth/react-native');
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage)
    });
  } catch (error) {
    // Fallback para getAuth se getReactNativePersistence não estiver disponível
    console.warn('getReactNativePersistence não disponível, usando getAuth padrão');
    auth = getAuth(app);
  }
}

export { auth };

console.log("🔥 Firebase conectado com sucesso!");