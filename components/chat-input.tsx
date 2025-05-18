import { View, Text, Pressable, TextInput } from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Voice, {
  SpeechResultsEvent,
  SpeechStartEvent,
} from "@react-native-voice/voice";
import { Button } from "@/components/Button";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from "@/constants/Colors";

type AudioButtonProps = {};

const AudioButton = ({}: AudioButtonProps) => {
  const [isListening, setIsListening] = useState(false);

  const startSpeechToText = async () => {
    try {
      await Voice.start("pt-BR");
      setIsListening(true);
    } catch (error) {
      console.log(error);
    }
  };

  const stopSpeechToText = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable
      className="items-center absolute right-0 justify-center"
      style={{
        borderRadius: 100,
        width: 50,
        height: 50,
      }}
      onPressIn={startSpeechToText}
      onPressOut={stopSpeechToText}
    >
      <MaterialCommunityIcons size={24} color={"#000"} name="microphone" />
    </Pressable>
  );
};

type ChatInputProps = {};

const ChatInput = ({}: ChatInputProps) => {
  return (
    <View className="flex-row justify-center items-center gap-2 px-6">
      <View className="relative flex-row items-center gap-2">
        <TextInput
          placeholder="Digite sua mensagem..."
          className="border border-gray-400 h-[40px] w-[250px] rounded-full px-4 py-2"
        />
        <AudioButton />
      </View>
      <Button
        size={"icon"}
        className={"bg-blue-primary rounded-full w-[40px] h-[40px]"}
      >
        <AntDesign name="arrowup" size={24} color={Colors.light.primaryYeallow}/>
      </Button>
    </View>
  );
};

export default ChatInput;
