


import { Text, View } from 'react-native'
import React from 'react'
import ModalScreen from './modal-screen'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ideaSchema } from '@/schemas/idea'
import { Input } from './Input'
import { Label } from './Label'
import { Button } from './Button'
import { ErrorField } from './form-input-field'

type Props = {
    open: boolean,
    setIsOpen: (value: boolean) => void
    submit: (idea: Idea) => void
}

const IdeaCreateModal = ({open, setIsOpen, submit}:Props) => {

  const {
    control,
    formState: {errors},
    handleSubmit,
    getValues
  } = useForm({
    resolver: zodResolver(ideaSchema)
  });

  const onSubmit = () => {
    const idea = getValues();
    submit({
        description: idea.content,
        title: idea.title,
        id: 1,
        user_id: 1
    });
    setIsOpen(false);
  }


  return (
    <ModalScreen
        visible={open}
        onRequestClose={() => setIsOpen(false)}
        wrapperClassNames="w-[300px] h-auto py-5"
        header={
            <Text className="dark:text-white font-semibold text-xl">Criar ideia</Text>
        }
    >
      <Controller 
            control={control}
            render={({field}) => (
                <View>
                   <Label>
                       Título
                   </Label>
                    <Input 
                      className='my-2'
                      variant='outline'
                      onChangeText={(e)=>field.onChange(e)}
                      value={field.value}
                    />  
                    <ErrorField
                        error={errors.title?.message}
                    />
                </View>
            )}
            name='title'
        />


        <Controller 
            control={control}
            render={({field}) => (
                <View>
                    <Label>
                       Conteúdo
                   </Label>
                    <Input 
                      className='my-2'
                      variant='outline'
                      multiline
                      onChangeText={(e)=>field.onChange(e)}
                      value={field.value}
                    />  
                    <ErrorField
                        error={errors.content?.message}
                    />
                </View>
            )}
            name='content'
        />

        <Button onPress={handleSubmit(onSubmit)} className='my-3'>
            <Text className='text-yeallow-primary text-lg font-medium'>
                Criar ideia
            </Text>
        </Button>

    </ModalScreen>
  )
}

export default IdeaCreateModal