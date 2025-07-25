
import { Text, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { cn } from '@/lib/utils'


type CategoriesScrollProps = {
    categories: string[]
    selected: string
    setSelected: (selected: string) => void
}

const CategoriesScroll = ({categories,selected, setSelected}: CategoriesScrollProps) => {

  
  return (
    <FlatList
      data={categories}
      renderItem={({item}) => (
        <TouchableOpacity className={cn(selected === item ? 'bg-blue-primary' : 'bg-gray-300 dark:bg-zinc-800' ,'px-4 py-2 text-center rounded-3xl mr-2')} onPress={() => setSelected(item)}>
            <Text className={cn(selected === item ? 'text-white' : 'text-zinc-500' , 'font-semibold')}>
                {item}
            </Text>
        </TouchableOpacity>
      )}
      horizontal
    />
  )
}

export default CategoriesScroll