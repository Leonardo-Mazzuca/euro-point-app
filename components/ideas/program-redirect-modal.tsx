import { View, Text } from "react-native";
import React from "react";
import { IdeaPostProps } from "./post-idea";
import ModalScreen from "../modal-screen";
import { Button } from "../Button";

const ProgramRedirectModal = ({
  close,
  onPrevStep,
  submit
}: IdeaPostProps & { submit: () => void }) => {
  return (
    <ModalScreen
      wrapperClassNames="w-[300px] pb-10 px-10"
      onRequestClose={close}
    >
      <Text className="font-medium mx-auto text-lg text-blue-dark dark:text-yeallow-primary">
        Você será redirecionado
      </Text>
      <View className="gap-2 mt-5">
        <Button
          onPress={submit}
          className="bg-yeallow-primary"
        >
          <Text className="text-blue-dark">Sim, vamos lá!</Text>
        </Button>
        <Button
          onPress={() => onPrevStep!("confirm")}
          className="border border-blue-dark dark:bg-transparent dark:border-blue-primary"
          variant={"outline"}
        >
          <Text className="text-blue-dark dark:text-blue-secondary">Nãaao, cancelaaa!</Text>
        </Button>
      </View>
    </ModalScreen>
  );
};

export default ProgramRedirectModal;
