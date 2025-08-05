import { Text } from "react-native";
import React from "react";
import ModalScreen from "./modal-screen";

type Props = {
  open: boolean;
  setIsOpen: (value: boolean) => void;
};
const IdeaAlertModal = ({ open, setIsOpen }: Props) => {
  return (
    <ModalScreen
      visible={open}
      onRequestClose={() => setIsOpen(false)}
      wrapperClassNames="w-[300px] h-[100px]"
    >
      <Text className="dark:text-white font-semibold text-xl">Ops!</Text>
      <Text className="dark:text-gray-200 font-medium text-lg">
        Você não pode sair dessa tela enquanto estiver publicando uma ideia!
      </Text>
    </ModalScreen>
  );
};

export default IdeaAlertModal;
