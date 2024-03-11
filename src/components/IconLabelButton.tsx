import { colors } from "@/styles/colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

// Adicione mais nomes de ícones conforme necessário

type ButtonProps = {
  children: ReactNode;
  onPress: () => void;
};

function Button({ children, onPress }: ButtonProps) {
  return (
    <TouchableOpacity className="flex-row items-center" onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}
type ValidMaterialIconName =
  | "arrow-forward-ios"
  | "arrow-back-ios"
  | "cleaning-services"
  | "filter-alt";

type LabelProps = {
  label: String;
  iconName: ValidMaterialIconName;
};

function LabelLeft({ label, iconName }: LabelProps) {
  return (
    <View className="flex-row items-center w-full gap-1 py-2">
      <Text className="text-sm text-white inline mr-1">{label}</Text>
      <MaterialIcons name={iconName} size={18} color={colors.primary} />
    </View>
  );
}

function LabelRight({ label, iconName }: LabelProps) {
  return (
    <View className="flex-row items-center w-full gap-1 py-2">
      <MaterialIcons name={iconName} size={18} color={colors.primary} />
      <Text className="text-sm text-white inline mr-1">{label}</Text>
    </View>
  );
}

function LabelLeftEnd({ label, iconName }: LabelProps) {
  return (
    <View className="flex-row justify-end items-end gap-1 py-2">
      <Text className="text-sm text-white inline mr-1">{label}</Text>
      <MaterialIcons name={iconName} size={18} color={colors.primary} />
    </View>
  );
}

Button.LabelLeft = LabelLeft;
Button.LabelRight = LabelRight;
Button.LabelLeftEnd = LabelLeftEnd;

export { Button };
