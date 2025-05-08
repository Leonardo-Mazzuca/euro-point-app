
import { Button } from '@/components/Button'
import Container from '@/components/container'
import DropDown from '@/components/dropdown'
import NewsletterForm from '@/components/newsletter-form'
import PostForm from '@/components/post-form'
import ProjectForm from '@/components/project-form'
import { postTypeOptions } from '@/constants/data'
import { PostCreateType, PostFormEnum, postSchema } from '@/schemas/post'
import AntDesign from '@expo/vector-icons/AntDesign'
import { router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import {FormProvider, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'

const PostScreen = () => {

  const handleClose = () => router.back();

  const formMethods = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      formType: PostFormEnum.post,
    }
  })

  const {handleSubmit,getValues,setValue,watch} = formMethods;

  const postType = watch('formType');

  const handleFormType = (value: PostFormEnum) => {
    setValue('formType', value);
  }

  const onSubmit = () => {
    const data = getValues();
    console.log(data);
  }

  return (
    <ScrollView>
      <Container className='flex-col'>
        <View className='flex-row w-full items-center justify-between'>
          <Button variant={"ghost"} onPress={handleClose}>
            <AntDesign name='close' size={24} color="black"/>
          </Button>
          <View className='flex-1'>
            <DropDown
              onChange={item => handleFormType(item.value as PostFormEnum)}
              data={postTypeOptions}
              value={postType}
              labelField="label"
              valueField="value"
              placeholder='Selecione'
            />
          </View>
        </View>

        <FormProvider {...formMethods}>
          <View className='mt-5 w-full h-full'>
            {postType === "project" && (<ProjectForm />)}
            {postType === "newsletter" && (<NewsletterForm />)}
            {postType === "post" && (<PostForm />)}
            <Button className='mt-10' onPress={handleSubmit(onSubmit)}>
              <Text>
                Salvar
              </Text>
            </Button>
          </View>
        </FormProvider>

      </Container>
    </ScrollView>
  );
}

export default PostScreen