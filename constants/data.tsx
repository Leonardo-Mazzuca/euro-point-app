import Feather from "@expo/vector-icons/Feather";
import { Colors } from "./Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import Foundation from "@expo/vector-icons/Foundation";
import AntDesign from '@expo/vector-icons/AntDesign';
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
    totalQuestions: 10,
    answerdId: "1"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "Kaizen",
    duration: "10 min",
    totalQuestions: 10 ,
    answerdId: "2"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "Test",
    duration: "10 min",
    totalQuestions: 10,
    answerdId: "3"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    title: "Test",
    duration: "10 min",
    totalQuestions: 10 
  },
]

const answeredQuizzes = [
  {
    id: "1",
    quizId: "1",
    totalPoints: 560,
    answeredQuestions: 10,
  },
  {
    id: "2",
    quizId: "2",
    totalPoints: 550,
    answeredQuestions: 7,
  },
  {
    id: "3",
    quizId: "3",
    totalPoints: 450,
    answeredQuestions: 5,
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

const achieviments: Achieviment[] = [
  {
    id:"1",
    title: "Pegando fogo",
    description: "Entre 3 dias seguidos",
    progress: 100,
  },
  {
    id:"2",
    title: "Mestre ensinador",
    description: "Obtenha 100xp",
    progress: 100,
  },
  {
    id:"3",
    title: "Escritor",
    description: "Escreva mais de 200 palavras",
    progress: 0,
  },
  {
    id:"4",
    title: "Escritor",
    description: "Escreva mais de 200 palavras",
    progress: 20,
  },
]

export {
  postTypeOptions,
  programData,
  quizzes,
  questions,
  answeredQuizzes,
  achieviments
}