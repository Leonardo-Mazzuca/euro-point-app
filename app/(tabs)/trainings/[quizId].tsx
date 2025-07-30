import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import Stepper from "@/components/stepper";
import GradientText from "@/components/gradient-text";
import QuestionCard from "@/components/question-card";
import { useLayoutContext } from "@/context/layout-context";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import ConfettiCannon from "react-native-confetti-cannon";
import { useQuizzes } from "@/hooks/use-quizzes";
import Loading from "@/components/loading";
import QuizFinishModal from "@/components/quiz-finish-modal";
import { Button } from "@/components/Button";
import QuizConfirmModal from "@/components/quiz-confirm-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuizContext } from "@/context/quiz-context";

const SingleQuiz = () => {
  const { quizId } = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isWrong, setIsWrong] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const { setPostButtonProps, setHidePostButton, hidePostButton } = useLayoutContext();
  const { quizzes, onQuizFinish, onNextQuestion } = useQuizzes();
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answeredQuestionsStatus, setAnsweredQuestionsStatus] = useState<
    ("success" | "error" | null)[]
  >([]);
  const [quizData, setQuizData] = useState({
    totalRights: 0,
    totalErrors: 0,
    totalPoints: 0,
  });
  const [openAdviceModal, setOpenAdviceModal] = useState(false);
  const {setQuizCurrentQuestion} = useQuizContext();

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setPostButtonProps({
        children: (
          <Ionicons
            name="sparkles"
            size={24}
            color={Colors.light.primaryYeallow}
          />
        ),
        onPress: () => router.push("/(tabs)/trainings/quiz-help"),
      });
    } else {
      setPostButtonProps({
        children: (
          <AntDesign
            size={24}
            color={Colors.light.primaryYeallow}
            name="plus"
          />
        ),
      });
    }
  }, [isFocused]);


  useEffect(() => {
    const current = quizzes.find((quiz) => quiz.id === Number(quizId));
    if (current) {
      setCurrentQuiz(current);
    }
  }, [quizzes]);

  const currentQuizMemo = useMemo(() => currentQuiz, [currentQuiz]);

  useEffect(() => {
    const questions = currentQuizMemo?.questions || [];
    if (questions) {
      setQuizQuestions(questions);
    }
  }, [currentQuizMemo]);


  const handleQuestionStatus = async () => {
    if (selectedAnswer) {
      const currentCorrectAnswer = currentQuestion?.correct_answer;
      const isRight =
        selectedAnswer.toLowerCase() === currentCorrectAnswer?.toLowerCase();

      setAnsweredQuestionsStatus((prev) => {
        const updated = [...prev];
        updated[currentStep - 1] = isRight ? "success" : "error";
        return updated;
      });

      if (currentQuestion) {
        if (isRight) {
          await AsyncStorage.setItem("totalRights", String(quizData.totalRights + 1));
          await AsyncStorage.setItem("totalPoints", String(quizData.totalPoints + currentQuestion?.total_points));
          setQuizData((prev) => ({
            ...prev,
            totalRights: prev.totalRights + 1,
            totalPoints: prev.totalPoints + currentQuestion?.total_points,
          }));
        } else {
          await AsyncStorage.setItem("totalErrors", String(quizData.totalErrors + 1));
          setQuizData((prev) => ({
            ...prev,
            totalErrors: prev.totalErrors + 1,
          }));
        }
      }
    }
  };

  const handleFinishButton = async () => {
    setIsSubmitted(true);

    if (selectedAnswer !== currentQuestion?.correct_answer) {
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
      }, 1000);
    } 

    if(currentQuizMemo) {
      if (currentStep >= (currentQuizMemo?.questions.length)) {
        setIsFinished(true);
        if(!currentQuiz) return;
        await onQuizFinish(quizData.totalPoints,currentQuiz?.id);
        return;
      }
  
      setTimeout(async () => {
        if(!currentQuiz) return;
        await onNextQuestion(currentQuiz?.id);
        setCurrentStep((prev) => prev + 1);
        setIsSubmitted(false);
        await handleQuestionStatus();
        setSelectedAnswer("");
      }, 1000);
    }

  };

  const handleQuizExit = () => {
    setOpenAdviceModal(true);
  }

  useEffect(()=> {
    if(currentQuestion){
      setQuizCurrentQuestion(currentQuestion);
    }
  },[currentQuestion])

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

  
  useEffect(() => {
    if (!currentQuiz || !currentQuiz.questions || currentQuiz.current_question_index === null || currentQuiz.current_question_index === undefined) {
      return;
    }
    
    setCurrentStep(currentQuiz.current_question_index + 1);
    
  }, [quizQuestions, currentQuiz]);

  useEffect(()=> {
    setCurrentQuestion(quizQuestions[currentStep - 1]);
  },[quizQuestions,currentStep]);

  useEffect(()=> {
    const updateQuizData = async () => {
      const storagedPoints = await AsyncStorage.getItem("totalPoints");
      const storagedRights = await AsyncStorage.getItem("totalRights");
      const storagedErrors = await AsyncStorage.getItem("totalErrors");

        setQuizData({
          totalPoints: Number(storagedPoints) || 0,
          totalRights: Number(storagedRights) || 0,
          totalErrors: Number(storagedErrors) || 0
        })
 
    }

    updateQuizData()
  },[])

  //to update badge statuses
  useEffect(()=> {

  },[]);


  if (!currentQuiz) {
    return <Loading />;
  }

  return (
    <TabsContainer>
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
