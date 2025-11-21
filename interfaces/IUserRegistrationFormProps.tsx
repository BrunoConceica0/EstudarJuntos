// IUserRegistrationFormProps.tsx

// Tipagem para os dados da primeira etapa
export interface IStep1Data {
  name: string;
  email: string;
  password: string;
  birthDate: Date;
}

// Tipagem para os dados da segunda etapa (que inclui a primeira)
export interface IFullRegistrationData extends IStep1Data {
  cep: string;
  state: string;
  city: string;
  subjects: string[];
  goals: string[];
}

interface IUserRegistrationFormProps {
  // Chamado para avançar para a próxima etapa (somente dados da Etapa 1)
  onNext: (data: IStep1Data) => void;
  // Chamado para finalizar o cadastro (dados completos)
  onSubmit: (data: IFullRegistrationData) => void;
}

export default IUserRegistrationFormProps;
