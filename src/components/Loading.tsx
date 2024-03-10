import { ActivityIndicator } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <ActivityIndicator className="flex-1 bg-primary items-center justify-center" />
  );
}
