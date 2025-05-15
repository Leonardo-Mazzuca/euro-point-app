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

const programData = [
  {
    id: "1",
    title: "Clic",
    description: "Aqui vai o texto da descrição",
    image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "1",
    title: "Clic",
    description: "Aqui vai o texto da descrição",
    image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "1",
    title: "Clic",
    description: "Aqui vai o texto da descrição",
    image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "1",
    title: "Clic",
    description: "Aqui vai o texto da descrição",
    image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: "1",
    title: "Clic",
    description: "Aqui vai o texto da descrição",
    image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
]

const quizzes = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "Clic",
    duration: "10 min",
    totalQuestions: 10 
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "Kaizen",
    duration: "10 min",
    totalQuestions: 10 
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "Test",
    duration: "10 min",
    totalQuestions: 10 
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "Test",
    duration: "10 min",
    totalQuestions: 10 
  },
]

const questions:Question[] = [
  {
    quizId: "1",
    id: "1",
    title: "Qual é a capital do Brasil?",
    options: [
      {
        id: "1",
        title: "Brasília",
        answer: "A"
      },
      {
        id: "2",
        title: "São Paulo",
        answer: "B"
      },
      {
        id: "3",
        title: "Rio de Janeiro",
        answer: "C"
      },
      {
        id: "4",
        title: "Salvador",
        answer: "D"
      }
    ],
    correctAnswer: "A"
  }
]

export {
  accountProfileItems,
  helpProfileItems,
  postTypeOptions,
  programData,
  quizzes,
  questions
}