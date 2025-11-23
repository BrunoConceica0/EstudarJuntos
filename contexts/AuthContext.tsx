import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ⚠️ MODO DE DESENVOLVIMENTO - Defina como true para usar dados locais sem Firebase
const DEV_MODE = true;

interface UserData {
  uid: string;
  email: string;
  name: string;
  birthDate?: Date;
  cep?: string;
  state?: string;
  city?: string;
  subjects?: string[];
  goals?: string[];
  // Campos específicos para doadores
  userType?: "student" | "donor";
  address?: string;
  donorType?: "individual" | "institution";
  cpf?: string; // Para pessoa física
  cnpj?: string; // Para pessoa jurídica
  companyName?: string; // Razão social para pessoa jurídica
  deliveryPreference?: "pickup" | "meetup" | "both";
  bookTypes?: string[];
}

interface AuthContextData {
  user: UserData | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (
    email: string,
    password: string,
    userData: Partial<UserData>
  ) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Chaves do AsyncStorage
const STORAGE_USER_KEY = "@estudarJuntos:user";
const STORAGE_USERS_DB_KEY = "@estudarJuntos:usersDB";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  // Carregar usuário salvo ao iniciar o app
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem(STORAGE_USER_KEY);
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para obter todos os usuários salvos (banco de dados local)
  const getUsersDB = async (): Promise<UserData[]> => {
    try {
      const usersDB = await AsyncStorage.getItem(STORAGE_USERS_DB_KEY);
      return usersDB ? JSON.parse(usersDB) : [];
    } catch (error) {
      console.error("Erro ao carregar banco de usuários:", error);
      return [];
    }
  };

  // Função para salvar todos os usuários
  const saveUsersDB = async (users: UserData[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_USERS_DB_KEY, JSON.stringify(users));
    } catch (error) {
      console.error("Erro ao salvar banco de usuários:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      if (DEV_MODE) {
        // MODO DE DESENVOLVIMENTO: Buscar usuário no AsyncStorage
        const users = await getUsersDB();
        const foundUser = users.find((u) => u.email === email);

        if (foundUser) {
          // Login bem-sucedido
          await AsyncStorage.setItem(
            STORAGE_USER_KEY,
            JSON.stringify(foundUser)
          );
          setUser(foundUser);
        } else {
          throw new Error("Usuário não encontrado. Crie uma conta primeiro.");
        }
      } else {
        // MODO PRODUÇÃO: Usar Firebase (quando configurado)
        throw new Error("Firebase não configurado. Use DEV_MODE = true");
      }
    } catch (error: any) {
      console.error("Erro ao fazer login:", error);
      throw new Error(error.message || "Erro ao fazer login");
    }
  };

  const signUp = async (
    email: string,
    password: string,
    userData: Partial<UserData>
  ) => {
    try {
      if (DEV_MODE) {
        // MODO DE DESENVOLVIMENTO: Salvar usuário no AsyncStorage
        const users = await getUsersDB();

        // Verificar se o email já existe
        const emailExists = users.some((u) => u.email === email);
        if (emailExists) {
          throw new Error("Este email já está cadastrado");
        }

        // Criar novo usuário
        const newUser: UserData = {
          uid: Date.now().toString(), // ID único baseado no timestamp
          email,
          name: userData.name || "",
          birthDate: userData.birthDate,
          cep: userData.cep,
          state: userData.state,
          city: userData.city,
          subjects: userData.subjects || [],
          goals: userData.goals || [],
          // Campos específicos para doadores
          userType: userData.userType,
          address: userData.address,
          donorType: userData.donorType,
          cpf: userData.cpf,
          cnpj: userData.cnpj,
          companyName: userData.companyName,
          deliveryPreference: userData.deliveryPreference,
          bookTypes: userData.bookTypes || [],
        };

        // Adicionar ao banco de dados local
        users.push(newUser);
        await saveUsersDB(users);

        // Fazer login automático
        await AsyncStorage.setItem(STORAGE_USER_KEY, JSON.stringify(newUser));
        setUser(newUser);
      } else {
        // MODO PRODUÇÃO: Usar Firebase (quando configurado)
        throw new Error("Firebase não configurado. Use DEV_MODE = true");
      }
    } catch (error: any) {
      console.error("Erro ao criar conta:", error);
      throw new Error(error.message || "Erro ao criar conta");
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_USER_KEY);
      setUser(null);
    } catch (error: any) {
      console.error("Erro ao fazer logout:", error);
      throw new Error(error.message || "Erro ao fazer logout");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
