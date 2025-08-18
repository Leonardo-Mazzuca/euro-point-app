import { Dimensions, TouchableOpacity, ViewStyle } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  withSpring,
  runOnJS,
  useAnimatedStyle,
  withDelay,
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";

const SHEET_OVER_DRAG = 300;

type Props = {
  onClose: () => void;
  onOpen?: () => void;
  children?: React.ReactNode;
  height?: number;
  styles?: ViewStyle;
  className?: string;
  position?: "bottom" | "top";
  isPanning: boolean,
  setIsPanning: (value: boolean) => void
};
const Sheet = ({
  onClose,
  children,
  height = 300,
  styles,
  className,
  position = "bottom",
  isPanning,
  setIsPanning
}: Props) => {
  const offset = useSharedValue(0);

  const close = () => {
    onClose();
  };

  const width = Dimensions.get("window").width;

  const pan = Gesture.Pan()
    .onStart(() => {
      runOnJS(setIsPanning)(true);
    })
    .onChange((e) => {
      const offsetDelta = e.changeY + offset.value;
      const clamp = Math.max(-SHEET_OVER_DRAG, offsetDelta);

      offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp);
    })
    .onFinalize(() => {
      if (offset.value < height / 3) {
        offset.value = withSpring(0);
      } else {
        offset.value = withSpring(height, {}, () => {
          runOnJS(close)();
        });
      }
    })
    .onEnd(() => {
      offset.value = withDelay(1000, withSpring(offset.value, {}, () => {
        runOnJS(setIsPanning)(false);
      }));
    });

  const translateY = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
    width,
    height: height,
    bottom: -SHEET_OVER_DRAG * 1.4,
    position: "absolute",
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View
        style={{
          ...translateY,
          ...styles,
        }}
        className={twMerge("dark:bg-zinc-700 bg-gray-300 p-3", className)}
      >
        <TouchableOpacity className="mx-auto" onPress={() => onClose()}>
          <MaterialCommunityIcons
            color={"black"}
            size={24}
            name="drag-horizontal"
            className="mx-auto"
          />
        </TouchableOpacity>

        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default Sheet;