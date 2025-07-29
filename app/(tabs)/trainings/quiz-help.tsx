import React, { useEffect, useState } from "react";
import Header from "@/components/header";
import BackButton from "@/components/back-button";
import { router } from "expo-router";
import { useLayoutContext } from "@/context/layout-context";
import { useIsFocused } from "@react-navigation/native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, SectionList, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import UserButton from "@/components/user-button";
import { cn } from "@/lib/utils";
import ChatInput from "@/components/chat-input";
import { getOpenAICredentials, openai } from "@/service/openai";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.utc();

const EuroHelpLogo = () => {
  return (
    <View className="rounded-full p-2 bg-blue-tertiary/5 dark:bg-blue-tertiary/20">
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
        <Text className="text-xl font-semibold dark:text-white">Euro Help</Text>
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
        <View className={cn("p-3 w-[250px] rounded-3xl rounded-tl-none", type === 'user' ? 'bg-blue-tertiary/5 dark:bg-blue-tertiary/20' : 'bg-gray-light/50 dark:bg-zinc-800')}>
            <Text className={cn("text-lg", type === 'user' ? 'text-blue-tertiary font-semibold' : 'text-black dark:text-white')}>
                {text}
            </Text>
        </View>
    )
}



const QuizHelp = () => {
  const { setHidePostButton, currentUser, setHideUI } = useLayoutContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");

  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused) {
      setHidePostButton(true);
      setHideUI(true);
    } else {
      setHidePostButton(false);
      setHideUI(false);
    }
  }, [isFocused]);

  const handlePrompt = async () => {
    if(prompt){
      await getOpenAIResponse();
    }
  }

  const utilData = `
   Questão atual: 
   Alternativas: 
   ...
   ...
   ...
  `;

  useEffect(()=>{
    if(prompt){
      handlePrompt()
    }
  },[prompt]);

  const getOpenAIResponse = async () => {
    try {

      const requestedPrompt = `Você está agindo como um guia para a questão atual do quiz. NÃO DE A RESPOSTA, apenas auxilie o usuário a obtela corretamente ${
        currentUser.username
      }:
  
      ${utilData}
  
        Utilize o seguinte contexto para responder: ${prompt}
    
        Evite criar dados irreais e foque apenas nas informações fornecidas.
    
        Responda as perguntas de modo claro e objetivo sem dar muitas voltas.
    
        Utilize os dados do perfil quando necessário.
        
      `;

      setIsGenerating(true);

      const {maxTokens,model} = getOpenAICredentials();

      const completion = await openai.completions.create({
        prompt: requestedPrompt,
        model: model,
        max_tokens: maxTokens,
        temperature: 0,
      });

      if(completion){
        const subject = completion.choices[0].text;
        setOutput(subject);
      }
    
      
    } catch (error) {
      console.log("Erro ao gerar texto com IA", error);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-dark-primary">
      <Header
        leftChild={<BackButton handleBack={() => router.back()} />}
        hideProfile
        middleChild={<EuroHelp />}
        hideLine
      />

 
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} className="flex-1 mt-2 px-4"> 

        <View className="gap-5">
          <View className="flex-row items-start gap-2 me-auto">
            <EuroHelpLogo />
            <ChatBox
              type="bot"
              text={output || "Olá! Eu sou o Euro Help, o assistente virtual da Euro. Estou aqui para te ajudar!"}
            />
          </View>
          <View className="ms-auto flex-row gap-2 items-center">
        
            {prompt && (
              <>
                  <UserButton />
                  <ChatBox type="user" text={prompt} />
              </>
            )}
          </View>
        </View>


        {/* <SectionList sections={[]} className="mt-5" /> */}
      </ScrollView>


      <View className="absolute bottom-10 left-0 right-0 ">
        <ChatInput 
          prompt={prompt}
          setPrompt={setPrompt}
          disabled={isGenerating}
        />
      </View>
    </SafeAreaView>

  );
};

export default QuizHelp;
