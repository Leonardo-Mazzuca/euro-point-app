import { Text } from "react-native";
import React from "react";
import { Button } from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";

const ExitButton = () => {

  const {logout} = useAuth();

  return (
    <Button onPress={logout} className="bg-white dark:bg-dark-card" variant={"ghost"}>
      <Text className="text-red-600 font-semibold">Sair</Text>
    </Button>
  );
};

export default ExitButton;
