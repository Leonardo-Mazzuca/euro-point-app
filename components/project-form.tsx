



import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { PostCreateType } from '@/schemas/post';
import FormInputField from './form-input-field';
import ImageUploader from './image-uploader';

const ProjectForm = () => {
  const {control,formState:{errors}} = useFormContext<PostCreateType>();
  
  const [image, setImage] = useState<string | null>(null);

  return (
    <View>
      <ImageUploader image={image} setImage={setImage} />
      <FormInputField 
        control={control}
        name={"project.title"}
        label={"Título"}
        error={errors.project?.title?.message}
      />
      <FormInputField 
        control={control}
        name={"project.content"}
        label={"Contéudo"}
        error={errors.project?.content?.message}
      />
      <FormInputField 
        control={control}
        name={"project.team"}
        label={"Time"}
        error={errors.project?.team?.message}
      />

    </View>
  )
}

export default ProjectForm