import React, { useEffect } from "react";
import Header from "@/components/header";
import BackButton from "@/components/back-button";
import { router } from "expo-router";
import { SafeAreaView, ScrollView, SectionList, Text, View } from "react-native";
import UserButton from "@/components/user-button";
import ChatInput from "@/components/chat-input";
import { useQuizContext } from "@/context/quiz-context";
import { useHideUi } from "@/hooks/use-hide-ui";
import { useAI } from "@/hooks/use-ai";
import ChatBox from "@/components/chat-box";
import { EuroHelp, EuroHelpLogo } from "@/components/euro-help";

const QuizHelp = () => {

  const {
    prompt,
    isGenerating,
    handlePrompt,
    output,
    setPrompt,
    groupedMessages
  } = useAI();

  const {quizCurrentQuestion} = useQuizContext();
  
  useHideUi();

  useEffect(()=>{
    if(prompt && quizCurrentQuestion){
      handlePrompt(quizCurrentQuestion)
    }
  },[prompt]);

  return (
    <SafeAreaView className="flex-1 pt-10 bg-white dark:bg-dark-primary">

          <Header
              leftChild={<BackButton handleBack={() => router.back()} />}
              hideProfile
              middleChild={<EuroHelp />}
              hideLine
          />

        <View className="flex-1 pb-16 h-full">
          <SectionList 
            sections={groupedMessages} 
            className="mt-5 flex-1"
            renderItem={({item})=> (
              <ChatBox
                {...item}
              />
            )}
            contentContainerStyle={{paddingBottom: 50}}
            initialNumToRender={5}
            keyExtractor={() => String(Math.random())}
            renderSectionHeader={()=> (
              <Text>

              </Text>
            )}
          
          />

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
