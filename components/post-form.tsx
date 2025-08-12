

import { View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { PostCreateType } from '@/schemas/post';
import FormInputField from './form-input-field';
import ImageUploader from './image-uploader';
import { WebView } from 'react-native-webview';
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

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8" /></head>
  <body contenteditable="true" style="height:100vh; font-size:16px;">
    Digite aqui seu texto rico...
  </body>
  </html>
`;

  return (
    <View className='flex-1'>
      <FormInputField 
        control={control}
        name={"post.title"}
        label={"Título"}
        error={errors.post?.title?.message}
      />
      {/* <FormInputField 
        control={control}
        name={"post.content"}
        label={"Conteúdo"}
        error={errors.post?.content?.message}
      /> */}
          
      
      <View className='mt-5'>
        <ImageUploader innerText='Imagens' allowMultipleSelection image={images} setImage={setImages as any} />
      </View>
    </View>
  )
}

export default PostForm