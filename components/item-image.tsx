


import { Image } from 'react-native'
import React from 'react'
import { isValidUrl } from '@/util'

const ItemImage = ({url, type, fallback}:{url:string, type: "card" | "item", fallback: string}) => {

  const className = {
    card: "w-[150px] h-[150px] aspect-square object-cover rounded-2xl",
    item: "w-full h-[200px] rounded-2xl"
  }

  console.log(url);

  return (
    <Image
      className={className[type]}
      //@ts-ignore
      source={{uri: url}}
    />
  )
}

export default ItemImage