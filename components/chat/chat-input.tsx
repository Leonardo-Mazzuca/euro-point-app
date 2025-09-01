import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "@/components/Button";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from "@/constants/Colors";
import { useLayoutContext } from "@/context/layout-context";

type AudioButtonProps = {};

const AudioButton = ({}: AudioButtonProps) => {
  const [isListening, setIsListening] = useState(false);
  const {theme} = useLayoutContext();


  return (
    <Pressable
      className="items-center absolute right-0 justify-center"
      style={{
        borderRadius: 100,
        width: 50,
        height: 50,
      }}
      // onPressIn={startSpeechToText}
      // onPressOut={stopSpeechToText}
    >
      <MaterialCommunityIcons size={24} color={theme === "dark" ? Colors.dark.primaryBlue : "#000"} name="microphone" />
    </Pressable>
  );
};

type ChatInputProps = {
  prompt: string
  setPrompt: (prompt: string) => void
  disabled: boolean
};

const ChatInput = ({prompt, setPrompt, disabled}: ChatInputProps) => {

  const [initialPrompt, setInitialPrompt] = useState("");

  useEffect(()=> {
    setInitialPrompt(prompt);
  },[]);



  const handlePrompt = () => {
    setPrompt(initialPrompt);
    setInitialPrompt("");
  }

  return (
    <View className="flex-row justify-center items-center gap-2 px-6">
      <View className="relative flex-row items-center gap-2">
        <TextInput
          onChangeText={(e)=>setInitialPrompt(e)}
          value={initialPrompt}
          placeholder="Digite sua mensagem..."
          className="border pe-10 dark:text-white border-gray-400 dark:border-zinc-800 dark:placeholder:text-white h-[40px] w-[250px] rounded-full px-4 py-2"
        />
        <AudioButton />
      </View>
      <Button
        disabled={disabled}
        onPress={handlePrompt}
        size={"icon"}
        className={"bg-blue-primary rounded-full w-[40px] h-[40px]"}
      >
        <AntDesign name="arrowup" size={24} color={Colors.light.primaryYeallow}/>
      </Button>
    </View>
  );
};

export default ChatInput;
