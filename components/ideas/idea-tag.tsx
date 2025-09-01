
import { View, Text } from 'react-native'
import React from 'react'
import { cn } from '@/lib/utils'

type IdeaTagProps = {
    status: IdeaStatus
}

const IdeaTag = ({status}: IdeaTagProps) => {

  const renderStatus = () => {
    switch (status) {
        case "approved":
            return "Aprovado"
        case "recused": 
            return "Recusado"
        case "in-progress":
            return "Em Análise"
    }
  }

  const renderWrapperClasses = () => {
    switch (status){
        case "recused":
            return "bg-red-500/25"
        case "approved": 
            return "bg-green-500/25"
        case "in-progress":
            return "bg-yellow-500/25"
    }
  }

  const renderTextClasses = () => {
    switch (status){
        case "recused":
            return "text-red-500"
        case "approved": 
            return "text-green-500"
        case "in-progress":
            return "text-yellow-500"
    }
  }

  return (
    <View className={cn("rounded-2xl px-2", renderWrapperClasses())}>
        <Text className={cn("text-red-500 font-normal", renderTextClasses())}>
            {renderStatus()}
        </Text>
    </View>
  );
}

export default IdeaTag