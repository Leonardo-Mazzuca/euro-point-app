import { View, Text, Image } from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/header";
import { Button } from "@/components/Button";
import Feather from "@expo/vector-icons/Feather";
import { Card } from "@/components/Card";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FooterItem } from "@/components/post-card";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Colors } from "react-native/Libraries/NewAppScreen";

const SingleNewsletter = () => {
  const { id } = useLocalSearchParams();
  const handleBack = () => router.back();

  const LeftChild = () => (
    <Button onPress={handleBack} className="me-auto" variant={"ghost"}>
      <Feather name="chevron-left" size={24} color="black" />
    </Button>
  );

  return (
    <View className="mt-10">
      <Header leftChild={<LeftChild />} hideProfile hideLine />

      <View className="p-5">
        <Card className="p-3 border border-gray-200">
          <Image
            source={{
              uri: "https://marcaspelomundo.com.br/wp-content/uploads/2025/01/IMG_7660-e1738353337221-875x1024.jpeg",
            }}
            className="w-full h-[200px] rounded-2xl"
          />

          <View className="flex-row items-center my-3">
            <Text className="font-semibold text-xl">
              Segurança e conformidade
            </Text>
            <Entypo name="dot-single" size={20} color="grey" />
            <Text className="text-gray-500">6 horas atrás</Text>
          </View>

          <View className="gap-6 flex-row">
            <FooterItem
              icon={
                <AntDesign
                  name="heart"
                  size={20}
                  color={Colors.light.hearthRed}
                />
              }
              text="48.8k"
            />
            <FooterItem
              icon={<Feather name="eye" size={22} color="grey" />}
              text="12M"
            />
            <FooterItem
              icon={<FontAwesome name="bookmark-o" size={22} color="black" />}
              text="82K"
            />
          </View>
        </Card>
      </View>
    </View>
  );
};

export default SingleNewsletter;
