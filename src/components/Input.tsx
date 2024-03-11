import { View, TextInput, TextInputProps } from "react-native";
import React, { ReactNode } from "react";
import { colors } from "@/styles/colors";

type InputProps = React.HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

function Input({ children }: InputProps) {
  return (
    <View className="w-full h-14 bg-transparent rounded-lg border border-border p-4 flex-row items-center gap-4">
      {children}
    </View>
  );
}

function InputField({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 font-normal text-base text-white"
      placeholderTextColor={colors.text}
      cursorColor={colors.primary}
      {...rest}
    />
  );
}

Input.Field = InputField;

export { Input };
