import React, { useEffect } from "react";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import BackButton from "@/components/back-button";
import { router } from "expo-router";
import { useLayoutContext } from "@/context/layout-context";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { KeyboardAvoidingView, Platform, SafeAreaView, SectionList, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import UserButton from "@/components/user-button";
import { cn } from "@/lib/utils";
import ChatInput from "@/components/chat-input";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.utc();

const EuroHelpLogo = () => {
  return (
    <View className="rounded-full p-2 bg-blue-tertiary/5">
      <MaterialCommunityIcons
        name="robot-excited-outline"
        size={32}
        color={Colors.light.tertiaryBlue}
      />
    </View>
  );
};

const EuroHelp = () => {
  const { theme } = useLayoutContext();

  return (
    <View className="flex-row gap-1 items-center">
       <EuroHelpLogo />
      <View>
        <Text className="text-xl font-semibold">Euro Help</Text>
        <View className="flex-row gap-2 items-center">
          <View className="rounded-full w-[12px] h-[12px] bg-green-primary" />
          <Text className="text-gray-400">Ativo</Text>
        </View>
      </View>
    </View>
  );
};

const ChatBox = ({text, type}:{text:string, type :'user' | 'bot'}) => {
    return (
        <View className={cn("p-3 w-[250px] rounded-3xl rounded-tl-none", type === 'user' ? 'bg-blue-tertiary/5' : 'bg-gray-light/50')}>
            <Text className={cn("text-lg", type === 'user' ? 'text-blue-tertiary font-semibold' : 'text-black')}>
                {text}
            </Text>
        </View>
    )
}



const QuizHelp = () => {
  const { setHidePostButton } = useLayoutContext();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setHidePostButton(true);
    } else {
      setHidePostButton(false);
    }
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === "ios" ? "padding" : "height"}

    style={{ flex: 1 }}
  >
    <SafeAreaView className="flex-1 bg-white dark:bg-dark-primary">
      <Header
        leftChild={<BackButton handleBack={() => router.back()} />}
        hideProfile
        middleChild={<EuroHelp />}
        hideLine
      />

 
      <View className="flex-1 mt-2 px-4"> 

        <View className="gap-5">
          <View className="flex-row items-start gap-2 me-auto">
            <EuroHelpLogo />
            <ChatBox
              type="bot"
              text="Olá! Eu sou o Euro Help, o assistente virtual da Euro. Estou aqui para te ajudar!"
            />
          </View>
          <View className="ms-auto flex-row gap-2 items-center">
            <UserButton />
            <ChatBox type="user" text="Ola, tudo bem?" />
          </View>
        </View>


        <SectionList sections={[]} className="mt-5" />
      </View>


      <View className="absolute bottom-24 left-0 right-0 ">
        <ChatInput />
      </View>
    </SafeAreaView>
  </KeyboardAvoidingView>

  );
};

export default QuizHelp;
