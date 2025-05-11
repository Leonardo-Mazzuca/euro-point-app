
import { Button } from '@/components/Button'
import Container from '@/components/container'
import DropDown from '@/components/dropdown'
import NewsletterForm from '@/components/newsletter-form'
import PostForm from '@/components/post-form'
import ProjectForm from '@/components/project-form'
import { postTypeOptions } from '@/constants/data'
import {  PostFormEnum, postSchema } from '@/schemas/post'
import AntDesign from '@expo/vector-icons/AntDesign'
import { router } from 'expo-router'
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native'
import {FormProvider, useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from '@/constants/Colors'
import { useState } from 'react'
import Sheet from '@/components/sheet'
import CloseButton from '@/components/close-button'


const PostScreen = () => {

  const handleClose = () => router.back();
  const [openPublicChanger, setOpenPublicChanger] = useState(false)

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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100} 
    >
      <ScrollView className=' dark:bg-dark-primary'>
        <Container className='flex-col'>
          <View className='flex-row w-full items-center justify-between'>
            <CloseButton handleClose={handleClose} />
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
              <View className="flex-row mt-10 w-full gap-2 justify-end items-center">
                <Button size="icon" variant="ghost" onPress={() => setOpenPublicChanger(true)}>
                  <FontAwesome6 name="earth-americas" size={24} color={Colors.light.primaryBlue} />
                </Button>
                <Button size="icon" variant="ghost" onPress={() => {}}>
                  <AntDesign name="clouduploado" size={24} color={Colors.light.primaryBlue} />
                </Button>
                <Button className='w-[100px] bg-blue-primary' onPress={handleSubmit(onSubmit)}>
                  <Text className='text-white font-semibold'>
                    Salvar
                  </Text>
                </Button>
              </View>
            </View>
          </FormProvider>
          
          
          {openPublicChanger && (
            <Sheet height={300} onClose={()=>setOpenPublicChanger(false)}>
              <></>
            </Sheet>
          )}

        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default PostScreen