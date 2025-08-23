import { View, Text } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Logo from "@/components/logo";
import { Button } from "@/components/Button";
import ArrowButton from "@/components/arrow-button";
import Animated, {
  FadeInDown,
  FadeInRight,
  FadeInUp,
  FadeOutLeft,
} from "react-native-reanimated";
import LottieView from "lottie-react-native";
import { Checkbox } from "@/components/Checkbox";
import { router } from "expo-router";

const Splash = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [showSplashAgain, setShowSplashAgain] = useState(false);
  const animation = useRef<LottieView>(null);

  const splashScreens = [
    {
      title: "Olá! Seja bem vindo ao europoint!",
      subtitle: "Acompanhe seus pontos e conquistas",
      animation: require("../../assets/lottie/hello.json"),
    },
    {
      title: "Fique conectado com os assuntos da empresa!",
      subtitle:
        "Agora você consegue saber de tudo que acontece na eurofarma na palma da sua mão, além de acessar nossos programas de uma maneira mais fácil!",
      animation: require("../../assets/lottie/conected.json"),
    },
    {
      title: "E quanto mais você usa o app mais você ganha!",
      subtitle:
        "Progrida diariamente e ganhe pontos com as nossas conquistas, ou usando o CLIC ou KAIZEN",
      animation: require("../../assets/lottie/prizes.json"),
    },
    {
      title: "Mas eai, vamos lá?",
      subtitle: "A hora da diversão é agora!",
      animation: require("../../assets/lottie/get-start.json"),
    },
  ];

  const onNext = () => {
    if (currentScreen < splashScreens.length - 1) {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const onPrev = () => {
    if (currentScreen > 0) {
      setCurrentScreen(currentScreen - 1);
    }
  };

  const handleDisableShowSplashAgain = () => {
    setShowSplashAgain(false);
  };

  return (
    <SafeAreaView>
      <Animated.View
        entering={FadeInUp.duration(800)}
        className="p-3 h-full items-center justify-center"
      >
        <Animated.View entering={FadeInDown.duration(500)}>
          <Logo />
        </Animated.View>
        <View className="mt-5 items-center justify-center gap-3">
          {splashScreens.map(
            (screen, index) =>
              currentScreen === index && (
                <Animated.View
                  key={index}
                  entering={FadeInRight.duration(500)}
                  exiting={FadeOutLeft.duration(500)}
                  className="items-center justify-center"
                >
                  <LottieView
                    autoPlay
                    ref={animation}
                    style={{
                      width: 350,
                      height: 350,
                    }}
                    source={screen.animation}
                  />
                  <Text className="font-semibold text-3xl text-center mt-5">
                    {screen.title}
                  </Text>
                  <Text className="text-gray-500 text-tg font-medium text-center">
                    {screen.subtitle}
                  </Text>
                  {index === splashScreens.length - 1 && (
                    <View className="flex-row mt-10 items-center gap-2">
                      <Checkbox
                        checked={showSplashAgain}
                        onCheckedChange={(value) => setShowSplashAgain(value)}
                      />
                      <Text>Não mostrar novamente essa tela</Text>
                    </View>
                  )}
                </Animated.View>
              )
          )}
        </View>
        {currentScreen === splashScreens.length - 1 && (
            <Button onPress={()=>router.push("/(auth)")} className="w-[200px] mt-16">
              <Text className="text-yeallow-primary font-semibold">Começar!</Text>
            </Button>
          )}
        <View className="flex-row mt-auto w-full justify-between">
          <ArrowButton
            disabled={currentScreen === 0}
            onPress={onPrev}
            variant="ghost"
            direction="left"
          />
          <ArrowButton
            disabled={currentScreen === splashScreens.length - 1}
            onPress={onNext}
            variant="ghost"
            direction="right"
          />
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Splash;
