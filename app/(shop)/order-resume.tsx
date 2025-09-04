import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "@/components/profile-header";
import { Text, View } from "react-native";
import { useProductsContext } from "@/context/products-context";
import { useLayoutContext } from "@/context/layout-context";
import Loading from "@/components/loading";
import { Button } from "@/components/Button";
import LottieView from "lottie-react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { router } from "expo-router";
import Points from "@/components/points";

const OrderResume = () => {
  const { totalPoints } = useProductsContext();
  const { currentUser } = useLayoutContext();
  const [hideScreen, setHideScreen] = useState(false);
  const animation = useRef<LottieView>(null);
  const [showAnimation, setShowAnimation] = useState(true);
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const {setProductsOnBag} = useProductsContext();

  const finalizeOrder = () => {
    setHideScreen(true);
  };

  const onFinish = () => {
    setProductsOnBag([]);
    router.push('/(tabs)')
  }

  useEffect(() => {
    if(hideScreen){
      setTimeout(() => {
        setShowAnimation(false)
        setShowFinalScreen(true)
      }, 6000);
    }
  }, [hideScreen, showAnimation]);

  if (!currentUser) {
    return <Loading />;
  }

  return (
    <SafeAreaView className="flex-1 dark:bg-dark-primary bg-white py-4 px-8">
      {!hideScreen ? (
        <>
          <ProfileHeader text="Resumo do pedido" />

          <View className="mt-5">
            <Text className="text-dark dark:text-white font-medium text-xl">
              Colaborador a receber
            </Text>

            <View className=" rounded-lg p-3 mt-2 dark:bg-zinc-800 bg-gray-100">
              <Text className="dark:text-white text-black font-semibold text-xl">
                {currentUser.username}
              </Text>
              <Text className="dark:text-white text-black font-semibold text-xl">
                <Text className="font-medium text-lg dark:text-zinc-300 text-zinc-500">
                  Área -{" "}
                </Text>
                {currentUser.area.name}
              </Text>
            </View>

            <View className="flex-row gap-3 items-center mt-10">
              <Text className="dark:text-white text-black font-semibold text-xl">
                Meus pontos
              </Text>
              <Points />
            </View>

            <View className="mt-10 dark:bg-zinc-800 bg-gray-100 p-3 rounded-lg">
              <View className="flex-row justify-between items-center">
                <Text className="dark:text-gray-400 text-gray-500 font-semibold text-lg">
                  Total do pedido:
                </Text>
                <Text className="dark:text-white text-black text-2xl font-semibold">
                  {totalPoints} Pontos
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="dark:text-gray-400 text-gray-500 font-semibold text-lg">
                  Pontos restantes:
                </Text>
                <Text className="dark:text-white text-black text-2xl font-semibold">
                  {currentUser.total_points - totalPoints} Pontos
                </Text>
              </View>
            </View>
          </View>

          <Button onPress={finalizeOrder} className="mt-auto rounded-xl">
            <Text className="text-white text-lg font-semibold">
              Finalizar pedido
            </Text>
          </Button>
        </>
      ) : (
        showAnimation && (
          <Animated.View
            entering={FadeInRight.duration(500)}
            exiting={FadeOutLeft.duration(500)}
            className="justify-center items-center h-full"
          >
            <Text className="text-5xl text-center font-semibold dark:text-white text-black">
              Pedido sendo preparado!
            </Text>
            <LottieView
              autoPlay
              style={{
                width: 350,
                height: 350,
              }}
              ref={animation}
              source={require("../../assets/lottie/cart.json")}
            />
          </Animated.View>
        )
      )}
      {showFinalScreen && (
        <View>
          <Animated.View
            entering={FadeInRight.duration(500)}
            exiting={FadeOutLeft.duration(500)}
            className="justify-center items-center h-full"
          >
            <Text className="text-5xl text-center font-semibold dark:text-white text-black">
              Pedido realizado com sucesso!
            </Text>
            <LottieView
              autoPlay
              style={{
                width: 350,
                height: 350,
              }}
              source={require("../../assets/lottie/success.json")}
            />
            <Text className="text-gray-700 font-semibold dark:text-gray-200">
              Você receberá um email recebendo instruções
            </Text>
            <Button onPress={onFinish} className="mt-10 rounded-xl w-[200px]">
              <Text className="text-white font-semibold">
                Voltar
              </Text>
            </Button>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default OrderResume;
