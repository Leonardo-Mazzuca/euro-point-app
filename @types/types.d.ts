import { IconProps } from "@expo/vector-icons/build/createIconSet"
import Feather from "@expo/vector-icons/Feather"
import React from "react"


declare global {
   
    type HomeScreen = "for-you" | "following"

    type ProfileItem = {
        icon: React.ReactNode,
        title: string
        link?: string,
        isToggler?:boolean
        rightChild?: React.ReactNode
        isTogglerActive?:boolean
        setToggleActive?: (value:boolean) => void

    }

    type Option = {
        label: string,
        value: string
    }

    type Post = {
        id:string
    }

    type Project = {
        id: string,
        title: string,
        description: string,
        image: string
    }

    type Idea = {
        id:string,
        title: string,
        content: string
    }

    type Program = {
        id: string,
        title: string,
        image: string,
        description: string
    }

    type Quiz = {
        id: string,
        totalQuestions: number,
        image: string,
        title: string,
        duration: string
    }

    type Question = {
        quizId: string,
        id: string,
        title: string,
        options: QuestionOption[]
        correctAnswer: string,
    }
    
    type QuestionOptions = {
        questionId: string,
        id: string,
        title: string,
        answer: string
    }

    type Achieviment = {
        id: string,
        title: string,
        progress: number,
        description: string,
    }

    type IdeaStatus = "in-progress" | "recused" | "approved"
}

export {}