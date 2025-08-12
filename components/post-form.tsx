

import { View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { PostCreateType } from '@/schemas/post';
import FormInputField from './form-input-field';
import ImageUploader from './image-uploader';
const PostForm = () => {

  const {control,formState:{errors, isSubmitSuccessful},setValue} = useFormContext<PostCreateType>();
  const [images, setImages] = useState<ExpoImageType[] | null>(null);

  useEffect(()=> {
    if(images){
      setValue("post.images", images);
    }
  },[images])
  
  useEffect(()=> {
    if(isSubmitSuccessful){
      setImages(null);
      setValue("post.images", []);
    }
  },[isSubmitSuccessful]);

  return (
    <View className='flex-1'>
      <FormInputField 
        control={control}
        name={"post.content"}
        label={"Conteúdo"}
        error={errors.post?.content?.message}
        multiline
      />
      
      <View className='mt-5'>
        <ImageUploader innerText='Imagens' allowMultipleSelection image={images} setImage={setImages as any} />
      </View>
    </View>
  )
}

export default PostForm