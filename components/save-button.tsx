import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useLayoutContext } from "@/context/layout-context";
import { Colors } from "@/constants/Colors";
import { FooterItem } from "./footer-item";

type Props = {
  isSaved: boolean;
  disabled?: boolean;
  onPress: () => void;
  totalSaved: number;
};

const SaveButton = ({ isSaved, disabled, onPress, totalSaved }: Props) => {
  const { theme } = useLayoutContext();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isSaved]);

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.7}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        {isSaved ? (
          <FooterItem
            icon={
              <FontAwesome
                name="bookmark"
                size={22}
                color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
              />
            }
            text={String(totalSaved)}
          />
        ) : (
          <FooterItem
            icon={
              <FontAwesome
                name="bookmark-o"
                size={22}
                color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
              />
            }
            text={String(totalSaved)}
          />
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default SaveButton;
