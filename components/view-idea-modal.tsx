


import { View, Text, ScrollView, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import ModalScreen from './modal-screen'
import BackButton from './back-button'
import IdeaTag from './ideas/idea-tag'
import DeleteButton from './delete-button'
import { Button } from './Button'

type Props = {
    idea: Idea,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    text: string,
    setText: React.Dispatch<React.SetStateAction<string>>,
    handleDelete: () => void
}

const ViewIdeaModal = ({
    idea,
    open,
    setOpen,
    text,
    setText,
    handleDelete
}: Props) => {

  const [changed, setChanged] = useState(false);

  const [initialText, setInitialText] = useState("");

  useEffect(()=> {
    setInitialText(text)
  },[text])

  useEffect(()=> {
    if(initialText !== text) {
        setChanged(true);
    }
  },[initialText, text])


  return (
    <ModalScreen 
    enableCloseButton={false}
    visible={open}
    onRequestClose={()=>setOpen(false)}
    wrapperClassNames="w-[300px] h-auto"
    header={
    <View className="flex-row w-[300px] items-center justify-between">
      <View className="flex-row gap-1 items-center">
        <BackButton handleBack={()=>setOpen(false)} />
        <Text className="dark:text-white font-semibold text-xl">
          Status: 
        </Text>
        <IdeaTag status={"approved"} />
      </View>
    </View>
    }

  >
    <Text className="text-2xl dark:text-white font-semibold">
      {idea.title}
    </Text>
    <ScrollView>
      <TextInput
      multiline
      value={text}
      onChangeText={setText}
      className="dark:text-gray-300"
    />
    </ScrollView>
    
    <View className='flex-row'>
        <DeleteButton className="me-auto w-[50px]" handleDelete={handleDelete} />
        {changed && (
            <Button className='w-[200px]'>
                <Text className='text-yeallow-primary'>
                    Salvar
                </Text>
            </Button>
        )}
    </View>

  </ModalScreen>
  )
}

export default ViewIdeaModal