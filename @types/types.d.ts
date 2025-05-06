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
}

export {}