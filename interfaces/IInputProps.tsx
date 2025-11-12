import { TextInputProps } from "react-native";
interface IInputProps extends TextInputProps {
  label?: string;
  error?: string;
}
export default IInputProps;
