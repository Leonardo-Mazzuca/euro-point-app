import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import Stepper from "@/components/stepper";
import GradientText from "@/components/gradient-text";
import QuestionCard from "@/components/question-card";
import { questions } from "@/constants/data";
import { useLayoutContext } from "@/context/layout-context";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import ConfettiCannon from 'react-native-confetti-cannon';
import { useQuizzes } from "@/hooks/use-quizzes";
import Loading from "@/components/loading";
const SingleQuiz = () => {

  const { quizId } = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isWrong, setIsWrong] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const {setPostButtonProps} = useLayoutContext();
  const {quizzes} = useQuizzes();
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  
  const isFocused = useIsFocused();

  useEffect(()=> {
    if(isFocused){
      setPostButtonProps({
        children: <Ionicons name="sparkles" size={24} color={Colors.light.primaryYeallow} />,
        onPress: ()=> router.push('/(tabs)/trainings/quiz-help')
      })
    } else {
      setPostButtonProps({
        children: (
          <AntDesign size={24} color={Colors.light.primaryYeallow} name="plus" />
        ),
      })
    }
  },[isFocused])

  useEffect(()=> {
    const current = quizzes.find((quiz) => quiz.id === Number(quizId));
    if(current){
      setCurrentQuiz(current);
    }
  },[quizzes]);

  const currentQuizMemo = useMemo(()=> currentQuiz,[currentQuiz]);

  useEffect(()=> {
    const questions = currentQuizMemo?.questions || [];
    if(questions){
      setQuizQuestions(questions);
    }
  },[currentQuizMemo])

  useEffect(()=> {
    setCurrentQuestion(quizQuestions[currentStep])
  },[])
  
  const handleFinishButton = () => {
    
    setIsSubmitted(true)

    if(selectedAnswer !== currentQuestion?.correct_answer){
      setIsWrong(true);
      setTimeout(()=>{
        setIsWrong(false);
      }
      ,1000)
    } 

    if(currentStep === currentQuizMemo?.questions.length){
      setIsFinished(true);
      return
    }

    setTimeout(()=>{
      setCurrentStep((prev) => prev + 1);
      setCurrentQuestion(quizQuestions[currentStep])
      setIsSubmitted(false)
      setSelectedAnswer("");
    }
    ,1000)

  }

  const FinishButton = () => (
    <TouchableOpacity
    disabled={!selectedAnswer || isFinished}
    onPress={handleFinishButton}
    className="border border-blue-primary dark:border-zinc-800 w-[200px] rounded-lg px-2 py-4">
      <GradientText text={currentStep!==10 ? "Proximo" : "Finalizar"} />
    </TouchableOpacity>
  );

  if(!currentQuiz){
    return <Loading />
  }

  return (
    <TabsContainer>
      <Header />
      <View className="px-4 mt-3 gap-3">
        <Text className="dark:text-white text-2xl font-semibold">
          Quiz {quizId}
        </Text>
        <Stepper
          steps={currentQuiz?.questions.length}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
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
        {/* <ArrowButton
          onPress={handleLeft}
          disabled={currentStep === 1}
          direction="left"
        /> */}
        <FinishButton />
        {/* <ArrowButton
          onPress={handleRight}
          disabled={currentStep === 10}
          direction="right"
        /> */}
      </View>
      {isFinished && (
        <ConfettiCannon count={200} origin={{x: -10, y: 0}} />
      )}
    </TabsContainer>
  );
};

export default SingleQuiz;
