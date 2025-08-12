import React, { useEffect, useRef } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { FooterItem } from "./footer-item";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type Props = {
  totalLikes: number;
  disabled?: boolean;
  onPress: () => void;
  isLiked: boolean;
};

export const LikeButton = ({ onPress, totalLikes, disabled, isLiked }: Props) => {
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
  }, [isLiked]);

  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} activeOpacity={0.7}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <FooterItem
          icon={
            <AntDesign
              name={isLiked ? "heart" : "hearto"}
              size={20}
              color={isLiked ? Colors.dark.hearthRed : Colors.light.softGray}
            />
          }
          text={String(totalLikes)}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};
