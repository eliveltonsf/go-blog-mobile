import React from "react";
import { ActivityIndicator } from "react-native";

export default function Loading() {
  return (
    <ActivityIndicator className="flex-1 text-primary items-center justify-center" />
  );
}
