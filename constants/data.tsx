import Feather from "@expo/vector-icons/Feather";
import { Colors } from "./Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { PostFormEnum } from "@/schemas/post";

const postTypeOptions:Option[] = [
  {
    label: "Newsletter",
    value: PostFormEnum.newsletter,
  },
  {
    label: "Projeto",
    value: PostFormEnum.project,
  },
  {
    label: "Portal Avisos",
    value: PostFormEnum.post,
  },
]

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

const helpProfileItems:ProfileItem[] = [
  {
    icon: <AntDesign name="questioncircleo" size={24} color={Colors.light.primaryBlue} />,
    title: "Reportar erro",
    link: "/"
  },
]



export {
  accountProfileItems,
  helpProfileItems,
  postTypeOptions
}