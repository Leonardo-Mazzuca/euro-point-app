import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import Stepper from "@/components/stepper";
import GradientText from "@/components/gradient-text";
import QuestionCard from "@/components/question-card";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";
import Loading from "@/components/loading";
import QuizFinishModal from "@/components/quiz-finish-modal";
import { Button } from "@/components/Button";
import QuizConfirmModal from "@/components/quiz-confirm-modal";
import PostButton from "@/components/post-button";
import { useRunningQuiz } from "@/hooks/use-running-quiz";
import { useLayoutContext } from "@/context/layout-context";

const SingleQuiz = () => {
  const { quizId } = useLocalSearchParams();
  const {theme} = useLayoutContext();
  const isDark = theme === "dark";
  
  const {
    answeredQuestionsStatus,
    currentQuestion,
    currentStep,
    handleFinishButton,
    handleQuizExit,
    isFinished,
    isSubmitted,
    isWrong,
    openAdviceModal,
    selectedAnswer,
    currentQuiz,
    currentQuizMemo,
    setCurrentStep,
    setSelectedAnswer,
    quizData,
    setOpenAdviceModal
  } = useRunningQuiz({quizId: String(quizId)});

  const isFocused = useIsFocused();

  //to update badge statuses
  useEffect(()=> {

  },[]);

  const PostButtonItem = () => {
    if(!isFocused) return null;

    return (
      <PostButton
        onPress={() => router.push("/(tabs)/trainings/quiz-help")}
      >
        <Ionicons
          name="sparkles"
          size={24}
          color={isDark ? Colors.dark.primaryYeallow : Colors.light.primaryBlue}
        />
      </PostButton>
    )
    
  }

  const FinishButton = () => (
    <TouchableOpacity
      disabled={!selectedAnswer || isFinished}
      onPress={handleFinishButton}
      className="border border-blue-primary dark:border-zinc-800 w-[200px] rounded-lg px-2 py-4"
    >
      <GradientText
        text={
          currentStep !== currentQuizMemo?.questions.length
            ? "Proximo"
            : "Finalizar"
        }
      />
    </TouchableOpacity>
  );

  if (!currentQuiz) {
    return <Loading />;
  }

  return (
    <TabsContainer postButton={<PostButtonItem />}>
      <Header />
      <View className="px-4 mt-3 gap-3">
        <View className="flex-row justify-between items-center">
          <Text className="dark:text-white text-2xl font-semibold">
            {currentQuiz.title}
          </Text>
          <Button onPress={handleQuizExit} variant={"link"}>
            <AntDesign name="back" size={24} color="white" />
          </Button>
        </View>
        <Stepper
          steps={currentQuiz?.questions.length}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          badgeStatus={answeredQuestionsStatus}
        />
      </View>

      {currentQuestion && (
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          setSelectedAnswer={setSelectedAnswer}
          isWrong={isWrong}
          isSubmitted={isSubmitted}
        />
      )}

      <View className="my-3 px-5 flex-row justify-center gap-4">
        <FinishButton />
      </View>
      {isFinished && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
      <QuizFinishModal
        quizData={quizData}
        visible={isFinished}
      />
      <QuizConfirmModal 
        visible={openAdviceModal}
        onContinue={()=>router.push('/(tabs)/trainings')}
        onCancel={()=>setOpenAdviceModal(false)}
        title="Opa!"
        subtitle="Você tem certeza que deseja sair?"
        description="Você poderá acessar o quiz novamente na aba de treinamentos"
        cancelButtonText="Nãoo, cancela!"
        confirmButtonText="Sim, sair!"
      />
    </TabsContainer>
  );
};

export default SingleQuiz;
