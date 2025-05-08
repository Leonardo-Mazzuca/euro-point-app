import { View } from 'react-native'
import React, { useState } from 'react'
import ImageUploader from '@/components/image-uploader';
import { Input } from '@/components/Input';
import { Label } from '@/components/Label';
import Quill from '@/components/quill';

const NewsletterForm = () => {

  const [image, setImage] = useState<string | null>(null);

  return (
    <View className='flex-1 gap-5'>
        <ImageUploader
            image={image}
            setImage={setImage}
        />
        <View>
            <Label>
                Título
            </Label>
            <Input 
                variant='line'
            />
        </View>
        <View className='flex-1'>
            <Label>
                Contéudo
            </Label>
            <Quill />
        </View>
    </View>
  )
}

export default NewsletterForm