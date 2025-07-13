import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLayoutContext } from "@/context/layout-context";
import { Colors } from "@/constants/Colors";
import { answeredQuizzes } from "@/constants/data";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type QuizCardProps = {
  selected: number | null;
  setSelected: (value: number) => void;
  quiz: Quiz
  showAnswered?: boolean
};

const QuizCard = ({ selected, setSelected, quiz, showAnswered}: QuizCardProps) => {

  const RADIUS = 10;

  const {theme} = useLayoutContext();

  const quizAnswers = answeredQuizzes.find((q) => parseInt(q.id) === quiz.id);

  const colors = theme === "dark" ? ["#1E1E2D", "#1E1E2D"] : ["#dedede", "#dedede"];
  const totalQuestions = quiz.questions.length;

  const AnswerText = () => {
    return (
      showAnswered && quizAnswers ? (
        <Text className="text-gray-400 text-sm flex-row items-center">
          <AntDesign name="profile" size={12} color="gray" /> {quizAnswers.answeredQuestions} / {totalQuestions}
        </Text>
      ) : (
        <Text className="text-gray-400 text-sm flex-row items-center">
          <AntDesign name="profile" size={12} color="gray" /> {totalQuestions} Questões
        </Text>
      )
    )
  }

  const AnswerFooterText = () => {
    return (
      showAnswered && quizAnswers ? (
        <Text className="text-gray-400 text-sm flex-row items-center">
          <MaterialIcons name="sports-score" size={12} color="grey" /> {quizAnswers.totalPoints} pontos
        </Text>
      ) : (
        <Text className="text-gray-400 text-sm flex-row items-center">
            <FontAwesome6 name="clock" size={12} color="grey" /> {quiz.duration}
        </Text>
      )
    );
  }

  return (
    <LinearGradient
      //@ts-ignore
      colors={selected === quiz.id ? [Colors.default.lightGradientBlue1, Colors.default.lightGradientBlue2] : colors}
      style={{ 
        borderRadius: RADIUS,
        width: "100%",
        padding: 2
      }}
      start={{x:0,y:0}}
      end={{x:1,y:0}}
    >
      <TouchableOpacity
        onPress={() => setSelected(quiz.id)}
        className={"flex-1 dark:bg-dark-primary bg-white flex-row px-4 gap-3 py-2"}
        style={{
          borderRadius: RADIUS
        }}
      >
        <Image
          className="w-[70px] h-[70px] rounded-xl"
          source={{
            uri:quiz.image
          }}
        />
        <View>
          <Text className="text-blue-primary dark:text-blue-secondary font-semibold text-xl">{quiz.title}</Text>
          <AnswerText />
          <AnswerFooterText />
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default QuizCard;
