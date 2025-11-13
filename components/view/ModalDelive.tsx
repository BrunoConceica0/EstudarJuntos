import Button from "@/components/common/Buttom";
import Input from "@/components/common/Input";
import FormatDate from "@/hooks/FormatDate";
import IDeliveryData from "@/interfaces/IDeliverData";
import IModalDeliveryProps from "@/interfaces/IModalDeliveryProps";
import { cores, typography, utility } from "@/style/index";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";

export default function ModalDelivery({
  visible,
  onClose,
  onSubmit,
}: IModalDeliveryProps) {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Tarde (12h - 18h)");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({ location: "" });

  const timeOptions = [
    "Manhã (8h - 12h)",
    "Tarde (12h - 18h)",
    "Noite (18h - 22h)",
  ];

  const validateForm = () => {
    const newErrors = { location: "" };

    if (!location.trim()) {
      newErrors.location = "Por favor, informe o local de encontro";
      setErrors(newErrors);
      return false;
    }

    setErrors({ location: "" });
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const IDeliveryData: IDeliveryData = {
      date,
      time: selectedTime,
      location: location.trim(),
    };

    onSubmit(IDeliveryData);
    resetForm();
  };

  const resetForm = () => {
    setLocation("");
    setDate(new Date());
    setSelectedTime("Tarde (12h - 18h)");
    setErrors({ location: "" });
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={handleCancel}
    >
      <Pressable style={utility.overlay} onPress={handleCancel}>
        <Pressable
          style={utility.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          {/* headerModal */}
          <View style={utility.headerModal}>
            <View style={utility.iconContainer}>
              <Ionicons name="location" size={24} color="#E53935" />
            </View>
            <Text style={[typography.subtitle, utility.titleModal]}>
              Combinar Entrega
            </Text>
          </View>

          <View style={utility.fieldContainer}>
            <Text style={[typography.textXs, utility.labelModal]}>Data</Text>
            <Pressable
              style={utility.dateInput}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={[typography.textXl, utility.dateText]}>
                {FormatDate(date)}
              </Text>
              <Ionicons name="calendar-outline" size={20} color="#6c6c6c" />
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={handleDateChange}
                minimumDate={new Date()}
              />
            )}
          </View>

          <View style={utility.fieldContainer}>
            <Text style={[typography.textXs, utility.labelModal]}>
              Horário Sugerido
            </Text>
            <View style={utility.timeOptionsContainer}>
              {timeOptions.map((option) => (
                <Pressable
                  key={option}
                  style={({ pressed }) => [
                    utility.timeOption,
                    selectedTime === option && [
                      utility.timeOptionSelected,
                      { borderColor: cores.primary.backgroundColor },
                    ],
                    pressed && utility.timeOptionPressed,
                  ]}
                  onPress={() => setSelectedTime(option)}
                >
                  <Text
                    style={[
                      typography.textXm,
                      utility.timeOptionText,
                      selectedTime === option && {
                        color: cores.primary.backgroundColor,
                        fontWeight: "600",
                      },
                    ]}
                  >
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Local usando componente Input */}
          <Input
            label="Local/Ponto de Referência"
            placeholder="Ex: Praça da Sé, próximo ao metrô"
            value={location}
            onChangeText={(text) => {
              setLocation(text);
              if (errors.location && text.trim()) {
                setErrors({ location: "" });
              }
            }}
            error={errors.location}
            multiline
            numberOfLines={2}
            style={utility.textInput}
          />

          {/* Botões */}
          <View style={utility.buttonContainer}>
            <View style={utility.buttonWrapper}>
              <Button title="Cancelar" onPress={handleCancel} />
            </View>
            <View style={utility.buttonWrapper}>
              <Button title="Enviar Proposta" onPress={handleSubmit} />
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
