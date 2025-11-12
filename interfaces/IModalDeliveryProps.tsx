import IDeliveryData from "@/interfaces/IDeliverData";
interface IModalDeliveryProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: IDeliveryData) => void;
}
export default IModalDeliveryProps;
