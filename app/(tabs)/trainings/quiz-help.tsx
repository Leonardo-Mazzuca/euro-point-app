import React, { useEffect } from "react";
import Header from "@/components/header";
import BackButton from "@/components/back-button";
import { router } from "expo-router";
import { SafeAreaView, SectionList, Text, View } from "react-native";
import ChatInput from "@/components/chat/chat-input";
import { useQuizContext } from "@/context/quiz-context";
import { useHideUi } from "@/hooks/use-hide-ui";
import { useAI } from "@/hooks/use-ai";
import ChatBox from "@/components/chat/chat-box";
import { EuroHelp } from "@/components/euro-help";
import Animated, { FadeIn } from "react-native-reanimated";
import ThinkingText from "@/components/chat/thinking-text";

const QuizHelp = () => {
  const { prompt, handlePrompt, output, setPrompt, groupedMessages, isGenerating } = useAI();

  const { quizCurrentQuestion } = useQuizContext();

  useHideUi();

  useEffect(() => {
    if (prompt && quizCurrentQuestion) {
      handlePrompt(quizCurrentQuestion);
    }
  }, [prompt]);


  return (
    <SafeAreaView className="flex-1 pt-10 bg-white dark:bg-dark-primary">
      <Header
        leftChild={<BackButton handleBack={() => router.back()} />}
        hideProfile
        middleChild={<EuroHelp />}
        hideLine
      />

      <View className="flex-1 pb-16 h-full">
        {isGenerating && (
          <Animated.View entering={FadeIn.duration(100)} className="ps-8">
            <ThinkingText />
          </Animated.View>
        )}
        <SectionList
          sections={groupedMessages}
          className="mt-5 flex-1"
          renderItem={({ item }) => <ChatBox {...item} />}
          contentContainerStyle={{ paddingBottom: 50 }}
          initialNumToRender={5}
          keyExtractor={() => String(Math.random())}
          renderSectionHeader={() => <Text></Text>}
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
