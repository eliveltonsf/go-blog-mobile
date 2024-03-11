import React from "react";
import { Button, Pressable } from "react-native";
import Icon, { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";

type ValidMaterialIconName = "menu" | "search" | "close";
// Adicione mais nomes de ícones conforme necessário

type IconButtonProps = {
  iconName: ValidMaterialIconName;
  onPress: () => void;
  colorPrimary?: boolean;
};

export default function IconButton({
  iconName,
  onPress,
  colorPrimary,
}: IconButtonProps) {
  return (
    <Pressable onPress={onPress}>
      <MaterialIcons
        name={iconName}
        size={22}
        color={colorPrimary ? colors.primary : colors.white}
      />
    </Pressable>
  );
}
