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
import ModalScreen from "@/components/modal-screen";
import { Button } from "@/components/Button";
const SingleQuiz = () => {
  const { quizId } = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isWrong, setIsWrong] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const { setPostButtonProps } = useLayoutContext();
  const { quizzes } = useQuizzes();
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

  useEffect(() => {
    setCurrentQuestion(quizQuestions[currentStep - 1]);
  }, [quizQuestions, currentStep]);

  const handleQuestionStatus = () => {
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
          setQuizData((prev) => ({
            ...prev,
            totalRights: prev.totalRights + 1,
            totalPoints: prev.totalPoints + currentQuestion?.total_points,
          }));
        } else {
          setQuizData((prev) => ({
            ...prev,
            totalErrors: prev.totalErrors + 1,
          }));
        }
      }
    }
  };

  const handleFinishButton = () => {
    setIsSubmitted(true);

    if (selectedAnswer !== currentQuestion?.correct_answer) {
      setIsWrong(true);
      setTimeout(() => {
        setIsWrong(false);
      }, 1000);
    }

    if (currentStep === currentQuizMemo?.questions.length) {
      setIsFinished(true);
      console.log("Quiz data: ", quizData);
      return;
    }

    setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
      setCurrentQuestion(quizQuestions[currentStep]);
      setIsSubmitted(false);
      handleQuestionStatus();
      setSelectedAnswer("");
    }, 1000);
  };

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
    <TabsContainer>
      <Header />
      <View className="px-4 mt-3 gap-3">
        <Text className="dark:text-white text-2xl font-semibold">
          {currentQuiz.title}
        </Text>
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
      <ModalScreen
        visible={isFinished}
        header={
          <Text className="dark:text-white text-zinc-600 text-2xl">
            Quiz finalizado!
          </Text>
        }
      >
        <Text className="font-semibold my-2 dark:text-gray-200 text-gray-600 text-xl">
          Dados:
        </Text>
        <Text className="dark:text-gray-400 text-gray-500 my-2">
          Pontos: {quizData.totalPoints}
        </Text>
        <Text className="dark:text-gray-400 text-gray-500 my-2">
          Erros: {quizData.totalErrors}
        </Text>
        <Text className="dark:text-gray-400 text-gray-500 my-2">
          Acertos: {quizData.totalRights}
        </Text>
        <Button className="bg-blue-primary my-2">
          <Text className="text-yeallow-primary">Voltar para a tela de quizzes</Text>
        </Button>
      </ModalScreen>
    </TabsContainer>
  );
};

export default SingleQuiz;
