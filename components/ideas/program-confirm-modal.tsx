import { View, Text } from "react-native";
import React from "react";
import { IdeaPostProps } from "./post-idea";
import ModalScreen from "../modal-screen";
import { Button } from "../Button";

const ProgramConfirmModal = ({
  close,
  onNextStep,
  onPrevStep,
  selectedProgram,
}: IdeaPostProps & { selectedProgram: string }) => {
  return (
    <ModalScreen wrapperClassNames="w-[300px] pb-10 px-10" onRequestClose={close}>
      <Text className="font-medium mx-auto text-center text-lg text-blue-dark dark:text-yeallow-primary">
        Você conhece o {selectedProgram}?
      </Text>
      <View className="gap-2 mt-5">
        <Button
          onPress={() => onNextStep!("redirect")}
          className="bg-yeallow-primary"
        >
          <Text className="text-blue-dark">Com certeza!</Text>
        </Button>
        <Button
          onPress={() => onPrevStep!("select-program")}
          className="border border-blue-dark dark:border-blue-primary dark:bg-transparent"
          variant={"outline"}
        >
          <Text className="text-blue-dark dark:text-blue-secondary">Não...acho que vou escolher outro</Text>
        </Button>
      </View>
    </ModalScreen>
  );
};

export default ProgramConfirmModal;
