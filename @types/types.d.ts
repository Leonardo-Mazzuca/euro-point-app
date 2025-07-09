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

    type User = {
        id: number;
        avatar: string;
        email: string;
        password: string;
        phone_number: string;
        saved_newsletter_ids: number[];
        saved_posts_ids: number[];
        saved_projects_ids: number[];
        username: string;
        area: {
            name: string,
            id:number
        }
    }

    type Channel = {
        id: number,
        name: string,
        user_id: number[],
        contact_email: string
    }

    type Post = {
        id: number,
        user_id: number,
        total_likes: number,
        total_views: number,
        created_at: string,
        content: string, 
        channel_id: number,
        images: string[]
        is_saved: boolean
    }

    type Newsletter = {
        id: number,
        title: string,
        owner_id: number,
        image: string
        channel_id: number
        created_at: string
        total_likes: number,
        total_views: number,
        content: string
    }

    type Team = {
        id:number,
        name: string,
        members_ids: number[]
    }

    type Project = {
        id: string,
        title: string,
        content: string,
        image: string
        owner_id: number,
        channel_id: number,
        members_ids: number[],
        created_at: string,
        title: string,
        team_id: number
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
        total_points: number
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

    type Idea = {
        id:string,
        title: string,
        content: string
    }
}

export {}