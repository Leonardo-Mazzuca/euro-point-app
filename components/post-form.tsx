

import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { PostCreateType } from '@/schemas/post';
import FormInputField from './form-input-field';
import ImageUploader from './image-uploader';

const PostForm = () => {

  const {control,formState:{errors},setValue} = useFormContext<PostCreateType>();
  const [images, setImages] = useState<string[] | null>(null);

  console.log(errors);
  console.log(images);
  
  useEffect(()=> {
    if(images){
      setValue("post.images", images);
    }
  },[images])

  return (
    <View className='flex-1'>
      <FormInputField 
        control={control}
        name={"post.title"}
        label={"Título"}
        error={errors.post?.title?.message}
      />
      <FormInputField 
        control={control}
        name={"post.content"}
        label={"Conteúdo"}
        error={errors.post?.content?.message}
      />
      <View className='mt-5'>
        <ImageUploader setValue={()=>setValue("post.images", images as string[])} innerText='Imagens' allowMultipleSelection image={images} setImage={setImages as any} />
      </View>
    </View>
  )
}

export default PostForm