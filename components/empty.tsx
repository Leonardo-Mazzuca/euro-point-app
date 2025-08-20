import { View, Text } from "react-native";
import React, { useEffect, useRef } from "react";
import { Button } from "./Button";
import { RelativePathString, router } from "expo-router";
import LottieView from "lottie-react-native";

type Props = {
  title: string;
  subtitle: string;
  redirect?: string;
  animationSource: any;
  redirectText?: string;
};

const Empty = ({ animationSource, redirect, subtitle, title, redirectText }: Props) => {
  const animation = useRef<LottieView>(null);

  useEffect(() => {
    // You can control the ref programmatically, rather than using autoPlay
    // animation.current?.play();
  }, []);


  return (
    <View className="mx-auto items-center gap-3 w-full">
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 250,
          height: 250,

        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={animationSource}
      />

      <View className="justify-center items-center gap-3">
        <Text className="dark:text-white text-2xl text-center font-semibold">{title}</Text>
        <Text className="dark:text-gray-300 font-normal text-md">{subtitle}</Text>
        {redirect && (
          <Button
            onPress={() => router.push(redirect as RelativePathString)}
            className="w-[200px]"
          >
            <Text className="dark:text-yeallow-primary text-white font-semibold">
              {redirectText}
            </Text>
          </Button>
        )}
      </View>
    </View>
  );
};

export default Empty;
