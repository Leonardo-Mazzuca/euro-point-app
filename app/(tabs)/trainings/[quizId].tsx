import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import TabsContainer from "@/components/tabs-container";
import Header from "@/components/header";
import Stepper from "@/components/stepper";
import GradientText from "@/components/gradient-text";
import ArrowButton from "@/components/arrow-button";
import QuestionCard from "@/components/question-card";
import { questions } from "@/constants/data";
import { useLayoutContext } from "@/context/layout-context";
import { useIsFocused } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
const SingleQuiz = () => {

  const { quizId } = useLocalSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const {setPostButtonProps} = useLayoutContext();

  const isFocused = useIsFocused();

  const quizQuestions = questions.find((question)=>question.quizId === quizId);

  useEffect(()=> {
    if(isFocused){
      setPostButtonProps({
        children: <Ionicons name="sparkles" size={24} color={Colors.light.primaryYeallow} />,
        onPress: ()=> {}
      })
    } else {
      setPostButtonProps({
        children: (
          <AntDesign size={24} color={Colors.light.primaryYeallow} name="plus" />
        ),
      })
    }
  },[isFocused])
  

  const FinishButton = () => (
    <TouchableOpacity
    disabled={currentStep!==10} 
    className="border border-blue-primary dark:border-zinc-800 w-[200px] rounded-lg px-2 py-4">
      <GradientText text="Finalizar" />
    </TouchableOpacity>
  );

  const handleLeft = () => setCurrentStep((prev) => prev - 1);
  const handleRight = () => setCurrentStep((prev) => prev + 1);

  return (
    <TabsContainer>
      <Header />
      <View className="px-4 mt-3 gap-3">
        <Text className="dark:text-white text-2xl font-semibold">
          Quiz {quizId}
        </Text>
        <Stepper
          steps={10}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </View>
   
        <QuestionCard 
          question={quizQuestions!}
        />


      <View className="my-3 px-5 flex-row justify-center gap-4">
        <ArrowButton
          onPress={handleLeft}
          disabled={currentStep === 1}
          direction="left"
        />
        <FinishButton />
        <ArrowButton
          onPress={handleRight}
          disabled={currentStep === 10}
          direction="right"
        />
      </View>
    </TabsContainer>
  );
};

export default SingleQuiz;
