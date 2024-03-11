import { colors } from "@/styles/colors";
import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { RadioButton } from "react-native-paper";
import IconButton from "./IconButton";
interface FilterModalProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: FilterDataProps) => void;
}

const FiltroModal: React.FC<FilterModalProps> = ({
  isVisible,
  onClose,
  onApply,
}) => {
  const [filters, setFilters] = useState<FilterDataProps>({
    tipo: "noticia",
  });

  const applyFilters = () => {
    onApply(filters);
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent={true}>
      <View className="m-12 bg-white mt-32 p-12 rounded-lg shadow-2xl gap-4">
        <View className="absolute top-2 right-2">
          <IconButton iconName="close" onPress={onClose} colorPrimary />
        </View>
        <Text className="text-base text-body">Selecione seus filtros</Text>
        <Text className="text-body">Tipo</Text>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              color={colors.primary}
              value="noticia"
              status={filters.tipo === "noticia" ? "checked" : "unchecked"}
              onPress={() => setFilters({ tipo: "noticia" })}
            />
            <Text>Notícia</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              color={colors.primary}
              value="release"
              status={filters.tipo === "release" ? "checked" : "unchecked"}
              onPress={() => setFilters({ tipo: "release" })}
            />
            <Text>Release</Text>
          </View>
        </View>

        <TouchableOpacity onPress={applyFilters}>
          <View className="flex justify-center items-center  h-12 rounded-md w-full border border-primary">
            <Text className="text-base text-primary">Aplicar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FiltroModal;
