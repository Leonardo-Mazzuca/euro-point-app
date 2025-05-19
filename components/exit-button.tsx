import { Text } from "react-native";
import React from "react";
import { Button } from "@/components/Button";

const ExitButton = () => {
  return (
    <Button className="bg-white dark:bg-dark-card" variant={"ghost"}>
      <Text className="text-red-600 font-semibold">Sair</Text>
    </Button>
  );
};

export default ExitButton;
