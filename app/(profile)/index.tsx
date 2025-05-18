import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileCard from "@/components/profile-card";
import { Button } from "@/components/Button";
import { Colors } from "@/constants/Colors";
import { AntDesign, Entypo, FontAwesome6, Foundation, Ionicons } from "@expo/vector-icons";
import { useLayoutContext } from "@/context/layout-context";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import ProfileHeader from "@/components/profile-header";
import ProfileAvatar from "@/components/profile-avatar";



const Profile = () => {

  const {theme,toggleTheme} = useLayoutContext();

  const accountProfileItems:ProfileItem[] = [
    {
      icon: <Feather name="user" size={28} color={Colors.light.primaryBlue} />,
      title: "Dados do perfil",
      link: "/(profile)/edit"
    },
    {
      icon: <Ionicons name="notifications-outline" size={28} color={Colors.light.primaryBlue} />,
      title: "Notificações",
      isToggler: true
    },
    {
      icon:<Foundation name="key" size={28} color={Colors.light.primaryBlue} />,
      title: "Alterar senha",
      link: "/(profile)/change-password"
    },
];
  
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
      link: "/(profile)/pontuations"
    },
    {
      icon: <Feather name="bookmark" size={24} color={Colors.light.primaryBlue} />,
      title: "Itens salvos",
      link: "/(profile)/saved"
    },
    {
      icon: <FontAwesome6 name="book-open-reader" size={24} color={Colors.light.primaryBlue} />,
      title: "Minhas conquistas",
      link: "/(profile)/achieviments"
    },
    {
      icon: <FontAwesome name="list-alt" size={24} color={Colors.light.primaryBlue} />,
      title: "Minhas publicações",
      link: "/(profile)/posts"
    },
  ];

  const helpProfileItems:ProfileItem[] = [
    {
      icon: <AntDesign name="questioncircleo" size={24} color={Colors.light.primaryBlue} />,
      title: "Reportar erro",
      link: "/"
    },
  ]
  

  return (
    <SafeAreaView className="flex-1 dark:bg-dark-primary bg-white py-4 px-8">
      <ScrollView>
        <ProfileHeader text="Perfil" />
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
