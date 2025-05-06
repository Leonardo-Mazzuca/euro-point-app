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
    
}

export {}