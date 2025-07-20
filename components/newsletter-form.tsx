import { Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import ImageUploader from "@/components/image-uploader";
import { useFormContext } from "react-hook-form";
import FormInputField from "./form-input-field";
import { PostCreateType } from "@/schemas/post";


const NewsletterForm = () => {
  const [images, setImages] = useState<string[] | null>(null);
  const {
    control,
    formState: { errors, isSubmitSuccessful },
    setValue
  } = useFormContext<PostCreateType>();

  useEffect(()=> {
    if(images){
      setValue("newsletter.images", images);
    }
  },[images])
  
  useEffect(()=> {
    if(isSubmitSuccessful){
      setImages(null);
      setValue("newsletter.images", []);
    }
  },[isSubmitSuccessful])

  return (
    <View className="flex-1 gap-5">
      <ImageUploader image={images} allowMultipleSelection setImage={setImages as any} />
      <FormInputField
        control={control}
        error={errors.newsletter?.title?.message}
        name="newsletter.title"
        label="Título"
      />
      <View className="flex-1">
        <FormInputField
          control={control}
          error={errors.newsletter?.content?.message}
          name="newsletter.content"
          label="Conteúdo"
        />
        <Text className="text-red-500">
            {errors.newsletter?.content?.message}
        </Text>
      </View>
    </View>
  );
};

export default NewsletterForm;
