



import React from 'react'
import { Button, ButtonProps } from '@/components/Button'
import { Entypo } from '@expo/vector-icons'
import { useLayoutContext } from '@/context/layout-context'

type ArrowButtonProps = {
    direction: "left" | "right";
    variant?: "default" | "ghost"
} & ButtonProps

const ArrowButton = ({direction,variant = "default",...rest}:ArrowButtonProps) => {

  const {theme} = useLayoutContext();
  const color = theme === "dark" ? "#1E1E2D" : variant === "ghost" ? "#1E1E2D" : "white";

  const className = variant === "ghost" ? 
  "bg-transparent text-gray-500" :
  "bg-blue-primary rounded-full h-[50px] w-[50px]";


  return (
    <Button  {...rest} className={className} size={"icon"}>
        <Entypo name={`chevron-${direction}`} size={32} color={color} />
    </Button>
  )
}

export default ArrowButton