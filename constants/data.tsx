import Feather from "@expo/vector-icons/Feather";
import { Colors } from "./Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const accountProfileItems:ProfileItem[] = [
    {
      icon: <Feather name="user" size={28} color={Colors.light.primaryBlue} />,
      title: "Dados do perfil",
      link: "/"
    },
    {
      icon: <Ionicons name="notifications-outline" size={28} color={Colors.light.primaryBlue} />,
      title: "Notificações",
      isToggler: true
    },
    {
      icon:<Foundation name="key" size={28} color={Colors.light.primaryBlue} />,
      title: "Alterar senha",
      link: "/"
    },
];

const preferenceProfileItems:ProfileItem[] = [
  {
    icon: <Feather name="moon" size={28} color={Colors.light.primaryBlue} />,
    title: "Tema escuro",
    isToggler: true
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

const helpProfileItems:ProfileItem[] = [
  {
    icon: <AntDesign name="questioncircleo" size={24} color={Colors.light.primaryBlue} />,
    title: "Reportar erro",
    link: "/"
  },
]



export {
  accountProfileItems,
  preferenceProfileItems,
  helpProfileItems
}