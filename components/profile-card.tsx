

import { Card, CardContent, CardHeader } from '@/components/Card'
import { Colors } from '@/constants/Colors'
import Feather from '@expo/vector-icons/Feather'
import { Text, View } from 'react-native'
import { Button } from '@/components/Button'


type ProfileCardProps = {
    title: string,
    items: ProfileItem[]
}

const ProfileCard = ({items,title}:ProfileCardProps) => {
  return (
   <Card
   style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        backgroundColor: 'white'
    }}
    className='rounded-lg border-0'
    >
    <CardHeader className='px-3 py-2'>
        <Text className='font-semibold tracking-[2px] text-[10px] text-gray-500 uppercase'>
            {title}
        </Text>
    </CardHeader>
    <CardContent>
        {items.map((item,index) => (
            <ProfileCardItem 
                item={item}
                key={index}
            />
        ))}
    </CardContent>
   </Card>
  )
}


const ProfileCardItem = ({item: {
    icon,
    title,
    link,
    isToggler,
    rightChild
}}:{item:ProfileItem}) => {
    return (
        <View className='flex-row my-2 items-center justify-between gap-2'>
            <View className='flex-row items-center gap-2'>
                {icon}
                <Text className='text-xl font-semibold'>
                    {title}
                </Text>
            </View>
            <View className='flex-row'>
                {rightChild}
                {link && (
                    <Button variant={"ghost"} size={"icon"}>
                        <Feather
                            color={Colors.light.primaryBlue}
                            size={24}
                            name='chevron-right'
                        />
                    </Button>
                )}
   
                {isToggler && (
                    <>
                    </>
                )}
            </View>
        </View>
    )
}

export default ProfileCard