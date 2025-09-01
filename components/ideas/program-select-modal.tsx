import { View, Text } from "react-native";
import React from "react";
import { IdeaPostProps } from "./post-idea";
import ModalScreen from "../modal-screen";
import { Button } from "../Button";

const ProgramSelectModal = ({
  close,
  onNextStep,
  setSelectedProgram,
}: IdeaPostProps & { setSelectedProgram: (program: string) => void }) => {
  const options = ["CLIC", "KAIZEN", "CLIC DESAFIOS"];

  return (
    <ModalScreen
      wrapperClassNames="w-[300px] pb-10 px-10"
      onRequestClose={close}
    >
      <Text className="font-medium text-xl text-center text-blue-dark dark:text-yeallow-primary">
        Selecione o programa desejado
      </Text>
      <View className="gap-2 mt-5">
        {options.map((option, index) => (
          <Button
            onPress={() => {
              setSelectedProgram(option);
              onNextStep!("confirm");
            }}
            className="border border-blue-dark dark:border-blue-primary dark:bg-transparent"
            variant={"outline"}
            key={index}
          >
            <Text className="text-blue-dark dark:text-blue-secondary">{option}</Text>
          </Button>
        ))}
      </View>
    </ModalScreen>
  );
};

export default ProgramSelectModal;
