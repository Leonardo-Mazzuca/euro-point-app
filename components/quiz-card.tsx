import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLayoutContext } from "@/context/layout-context";
import { Colors } from "@/constants/Colors";

type QuizCardProps = {
  selected: string;
  setSelected: (value: string) => void;
  quiz: Quiz
};

const QuizCard = ({ selected, setSelected, quiz}: QuizCardProps) => {

  const RADIUS = 10;

  const {theme} = useLayoutContext();

  const colors = theme === "dark" ? ["#1E1E2D", "#1E1E2D"] : ["#dedede", "#dedede"];

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
            uri: "https://marcaspelomundo.com.br/wp-content/uploads/2025/01/IMG_7660-e1738353337221-875x1024.jpeg",
          }}
        />
        <View>
          <Text className="text-blue-primary dark:text-blue-secondary font-semibold text-xl">CLIC</Text>
          <Text className="text-gray-400 text-sm flex-row items-center">
            <AntDesign name="profile" size={12} color="gray" /> 10 Questões
          </Text>
          <Text className="text-gray-400 text-sm flex-row items-center">
            <FontAwesome6 name="clock" size={12} color="grey" /> 20 min
          </Text>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default QuizCard;
