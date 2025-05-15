import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import { Colors } from "@/constants/Colors";

type GradientTextProps = {
  text: string;
};
const GradientText = ({ text }: GradientTextProps) => {
  return (
    <MaskedView style={{ height: 24 }} maskElement={<Text className="font-semibold text-center text-xl">{text}</Text>}>
      <LinearGradient
        colors={[Colors.default.lightGradientBlue1, Colors.default.lightGradientBlue2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ flex: 1, justifyContent: "center",  }}
      />
    </MaskedView>
  );
};

export default GradientText;
