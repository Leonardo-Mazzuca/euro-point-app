
import React from 'react'
import { Input, InputProps } from '@/components/Input'
import AntDesign from '@expo/vector-icons/AntDesign'
import { cn } from '@/lib/utils'

const SearchInput = ({className,placeholder = "Busque uma postagem...",...rest}:InputProps) => {
  return (
    <Input
        wrapperClasses='mt-4'
        className={cn("rounded-2xl dark:placeholder:text-gray-300 dark:bg-zinc-600", className)}
        placeholder={placeholder}
        suffixIcon={<AntDesign name="search1" size={24} color="grey" />}
        {...rest}
    />
  )
}

export default SearchInput