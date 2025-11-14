import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

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
export const auth = getAuth(app);

console.log("🔥 Firebase conectado com sucesso!");