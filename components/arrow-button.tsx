



import React from 'react'
import { Button, ButtonProps } from '@/components/Button'
import { Entypo } from '@expo/vector-icons'
import { useLayoutContext } from '@/context/layout-context'

type ArrowButtonProps = {
    direction: "left" | "right";
} & ButtonProps

const ArrowButton = ({direction,...rest}:ArrowButtonProps) => {

  const {theme} = useLayoutContext();
  const color = theme === "dark" ? "#1E1E2D" : "white";

  return (
    <Button {...rest} className="bg-blue-primary rounded-full h-[50px] w-[50px]" size={"icon"}>
        <Entypo name={`chevron-${direction}`} size={32} color={color} />
    </Button>
  )
}

export default ArrowButton