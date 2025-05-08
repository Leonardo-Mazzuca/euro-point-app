

import { View, Text } from 'react-native'
import React from 'react'
import { useFormContext } from 'react-hook-form';
import { PostCreateType } from '@/schemas/post';
import FormInputField from './form-input-field';

const PostForm = () => {

  const {control,formState:{errors}} = useFormContext<PostCreateType>();

  return (
    <View>
      <FormInputField 
        control={control}
        name={"post.content"}
        label={"Conteúdo"}
        error={errors.post?.content?.message}
      />
    </View>
  )
}

export default PostForm