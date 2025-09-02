import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useLayoutContext } from "@/context/layout-context";
import { Colors } from "@/constants/Colors";

type QuizCardProps = {
  selected: Quiz | null;
  setSelected: (value: Quiz) => void;
  quiz: Quiz
};

const QuizCard = ({ selected, setSelected, quiz}: QuizCardProps) => {

  const RADIUS = 10;

  const {theme} = useLayoutContext();

  const colors = theme === "dark" ? ["#1E1E2D", "#1E1E2D"] : ["#dedede", "#dedede"];

  return (
    <LinearGradient
      //@ts-ignore
      colors={selected?.id === quiz.id ? [Colors.default.lightGradientBlue1, Colors.default.lightGradientBlue2] : colors}
      style={{ 
        borderRadius: RADIUS,
        width: "100%",
        padding: 2
      }}
      start={{x:0,y:0}}
      end={{x:1,y:0}}
    >
      <TouchableOpacity
        onPress={() => setSelected(quiz)}
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
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default QuizCard;
