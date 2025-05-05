import React from "react";
import Container from "@/components/container";
import Header from "@/components/header";
import { Text, TouchableOpacity, View } from "react-native";
import { Button } from "@/components/Button";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";

const ProfileHeader = () => {
  const onPress = () => router.back();
  return (
    <View className="flex-row items-center gap-2">
      <TouchableOpacity onPress={onPress}>
        <Feather name="chevron-left" size={28} color={"black"} />
      </TouchableOpacity>
      <Text className="text-2xl font-semibold">Perfil</Text>
    </View>
  );
};

const ProfileAvatar = () => (
  <View className="my-5 gap-2 flex-row items-center">
    <Avatar className="h-[100px] w-[100px]" alt="User image">
      <AvatarImage
        source={{
          uri: "https://avatars.githubusercontent.com/u/66306912?v=4",
        }}
      />
      <AvatarFallback>
        <Text>LM</Text>
      </AvatarFallback>
    </Avatar>
    <View>
        <Text className="font-semibold text-2xl">
            Leonardo Mazzuca
        </Text>
        <Text className="text-gray-600 text-lg">
            TI Projetos
        </Text>
    </View>
  </View>
);
const Profile = () => {
  return (
    <SafeAreaView className="flex-1 py-4 px-8">
      <ProfileHeader />
      <ProfileAvatar />
    </SafeAreaView>
  );
};

export default Profile;
