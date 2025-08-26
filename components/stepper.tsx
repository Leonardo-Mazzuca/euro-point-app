import { View, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import Badge from "@/components/badge";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/constants/Colors";
import { useLayoutContext } from "@/context/layout-context";
import { cn } from "@/lib/utils";

type StepperProps = {
  steps: number;
  currentStep: number;
  setCurrentStep: (value: number) => void;
  badgeStatus?: ("success" | "error" | null)[];
};
const Stepper = ({
  currentStep,
  steps,
  setCurrentStep,
  badgeStatus,
}: StepperProps) => {
  const { theme } = useLayoutContext();
  const disabledColors =
    theme !== "dark"
      ? [Colors.light.secondBg, Colors.light.secondBg]
      : [Colors.dark.secondBg, Colors.dark.secondBg];

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: currentStep - 1,
      animated: true,
      viewPosition: 0.5,
    });
  }, [currentStep]);


  return (
    <View className="px-4">
      <FlatList
        ref={flatListRef}
        data={Array.from({ length: steps })}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        getItemLayout={(data, index) => ({
          length: 64,
          offset: 64 * index,
          index,
        })}
        renderItem={({ item, index }) => {
          const status = badgeStatus ? badgeStatus[index] : null;

          const isError = status === "error";
          const noStatus = !status;

          const isDisabled = currentStep - 1 !== index && "opacity-50";
          const statusColor = noStatus
            ? disabledColors
            : isError
            ? [Colors.default.error, Colors.default.error]
            : [Colors.default.success, Colors.default.success];

          return (
            <View className="items-center">
              <TouchableOpacity
                className={cn(isDisabled)}
                disabled={currentStep - 1 !== index}
                onPress={() => setCurrentStep(index + 1)}
              >
                <Badge
                  colors={
                    currentStep === index + 1 ? undefined : statusColor
                  }
                  textClasses={currentStep === index + 1 ? "text-white" : ""}
                >
                  {index + 1}
                </Badge>
              </TouchableOpacity>

              <LinearGradient
                //@ts-ignore
                colors={
                  currentStep === index + 1
                    ? disabledColors
                    : statusColor
                }
                style={{
                  marginTop: 10,
                  width: 50,
                  height: 3,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Stepper;
