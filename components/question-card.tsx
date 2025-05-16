import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import Badge from "./badge";
import { cn } from "@/lib/utils";
import { Colors } from "@/constants/Colors";
import * as Animatable from "react-native-animatable";

type QuestionCardProps = {
  question: Question;
  selectedAnswer: string;
  setSelectedAnswer: (value: string) => void;
  isWrong: boolean;
  isSubmitted: boolean;
};
const QuestionCard = ({
  question: { correctAnswer, options, title },
  selectedAnswer,
  setSelectedAnswer,
  isWrong,
  isSubmitted,
}: QuestionCardProps) => {
  const selectedColors = [
    Colors.default.lightGradientBlue1,
    Colors.default.lightGradientBlue2,
  ];
  const notSelectedColors = [
    Colors.light.neutralGray,
    Colors.light.neutralGray,
  ];

  const viewElement = useRef(null);

  useEffect(() => {
    if (isWrong) {
      //@ts-ignore
      viewElement?.current?.animate("shake", 500, "linear");
    }
  }, [isWrong]);

  return (
    <View className="px-8 py-8">
      <Text className="text-xl dark:text-white font-semibold">{title}</Text>
      <Animatable.View ref={viewElement}>
        <FlatList
          className="mt-5"
          data={options}
          contentContainerStyle={{ gap: 25 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className={cn(
                "flex-row p-2 rounded-3xl items-center gap-2",
                isWrong && item.answer === correctAnswer && "bg-green-500",
                isWrong && item.answer === selectedAnswer && "bg-red-500",
                isSubmitted && "pointer-events-none",
                isSubmitted && item.answer === correctAnswer && "bg-green-500"
              )}
              onPress={() => setSelectedAnswer(item.answer)}
            >
              <Badge
                textClasses={cn(
                  "text-zinc-800",
                  selectedAnswer === item.answer && "text-white"
                )}
                colors={
                  selectedAnswer === item.answer
                    ? selectedColors
                    : notSelectedColors
                }
              >
                {item.answer}
              </Badge>
              <Text className={"text-xl dark:text-gray-300 font-normal"}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
        />
      </Animatable.View>
    </View>
  );
};

export default QuestionCard;
