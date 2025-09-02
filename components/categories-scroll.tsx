
import { Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { cn } from '@/lib/utils'


type CategoriesScrollProps = {
    categories: string[]
    selected: string
    setSelected: (selected: string) => void
    className?: string
}

const CategoriesScroll = ({categories,selected, setSelected, className}: CategoriesScrollProps) => {

  
  return (
    <FlatList
      className={className}
      data={categories}
      renderItem={({item}) => (
        <TouchableOpacity className={cn(selected === item ? 'bg-blue-primary dark:bg-yeallow-primary' : 'bg-gray-300 dark:bg-zinc-800' ,'px-4 py-2 text-center rounded-3xl mr-2')} onPress={() => setSelected(item)}>
            <Text className={cn(selected === item ? 'text-white dark:text-blue-primary' : 'text-zinc-500' , 'font-semibold')}>
                {item}
            </Text>
        </TouchableOpacity>
      )}
      horizontal
    />
  )
}

export default CategoriesScroll