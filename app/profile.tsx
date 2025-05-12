import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import ProfileCard from "@/components/profile-card";
import { accountProfileItems, helpProfileItems } from "@/constants/data";
import { Button } from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { AntDesign, Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useLayoutContext } from "@/context/layout-context";


const ProfileHeader = () => {
  const onPress = () => router.back();
  const {theme} = useLayoutContext();
  return (
    <View className="flex-row items-center gap-2">
      <TouchableOpacity onPress={onPress}>
        <Feather name="chevron-left" size={28} color={theme === "dark" ? Colors.dark.icon : Colors.light.icon} />
      </TouchableOpacity>
      <Text className="text-2xl dark:text-white font-semibold">Perfil</Text>
    </View>
  );
};

const ProfileAvatar = () => (
  <View className="my-5 gap-2 flex-row items-center">
    <View className="relative">
      <View 
        style={{borderRadius: 100}}
        className="bg-green-400 h-4 w-4 absolute right-5 bottom-0 z-50"
      />
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
    </View>
    <View>
        <Text className="font-semibold dark:text-gray-200 text-2xl">
            Leonardo Mazzuca
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 text-lg">
            TI Projetos
        </Text>
    </View>
  </View>
);
const Profile = () => {

  const {theme,toggleTheme} = useLayoutContext();
  
  const preferenceProfileItems:ProfileItem[] = [
    {
      icon: <Feather name="moon" size={28} color={Colors.light.primaryBlue} />,
      title: "Tema escuro",
      isToggler: true,
      isTogglerActive: theme === "dark",
      setToggleActive: toggleTheme
    },
    {
      icon: <Entypo name="language" size={28} color={Colors.light.primaryBlue} />,
      title: "Linguagem",
      link: "/"
    },
    {
      icon: <AntDesign name="barschart" size={24} color={Colors.light.primaryBlue} />,
      title: "Pontuação dos quizzes",
      link: "/"
    },
    {
      icon: <Feather name="bookmark" size={24} color={Colors.light.primaryBlue} />,
      title: "Itens salvos",
      link: "/"
    },
    {
      icon: <FontAwesome6 name="book-open-reader" size={24} color={Colors.light.primaryBlue} />,
      title: "Minhas conquistas",
      link: "/"
    },
  ];
  

  return (
    <SafeAreaView className="flex-1 dark:bg-dark-primary bg-white py-4 px-8">
      <ScrollView>
        <ProfileHeader />
        <ProfileAvatar />
        <View className="gap-5 mb-5">
          <ProfileCard
            title="conta"
            items={accountProfileItems}
          />
          <ProfileCard
            title="preferências"
            items={preferenceProfileItems}
          />
          <ProfileCard
            title="preferências"
            items={helpProfileItems}
          />
          <Button className="bg-white dark:bg-dark-card" variant={"ghost"}>
            <Text className="text-red-600 font-semibold">
              Sair
            </Text>
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
