
import React from 'react'
import { Button, ButtonProps } from '@/components/Button'
import { AntDesign } from '@expo/vector-icons'
import { useLayoutContext } from '@/context/layout-context'
import { Colors } from '@/constants/Colors'

type CloseButtonProps = {
    handleClose: () => void
} & ButtonProps

const CloseButton = ({handleClose,...rest}:CloseButtonProps) => {

  const {theme} = useLayoutContext();

  return (
    <Button {...rest} variant={"ghost"} onPress={handleClose}>
     <AntDesign name='close' size={24} color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}/>
    </Button>
  )
}

export default CloseButton