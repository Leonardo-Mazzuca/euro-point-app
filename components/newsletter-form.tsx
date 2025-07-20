import { Text, View } from "react-native";
import React, { useState } from "react";
import ImageUploader from "@/components/image-uploader";
import Quill from "@/components/quill";
import { Controller, useFormContext } from "react-hook-form";
import FormInputField from "./form-input-field";
import { PostCreateType } from "@/schemas/post";
import { Label } from "./Label";

const NewsletterForm = () => {
  const [image, setImage] = useState<string | null>(null);
  const {
    control,
    formState: { errors },
    setValue
  } = useFormContext<PostCreateType>();

  return (
    <View className="flex-1 gap-5">
      <ImageUploader setValue={()=>{}} image={image} setImage={setImage as any} />
      <FormInputField
        control={control}
        error={errors.newsletter?.title?.message}
        name="newsletter.title"
        label="Título"
      />
      <View className="flex-1">
        <Label>Conteúdo</Label>
        <Controller
          control={control}
          name="newsletter.content"
          render={({ field }) => (
            <></>
          )}
        />
        <Text className="text-red-500">
            {errors.newsletter?.content?.message}
        </Text>
      </View>
    </View>
  );
};

export default NewsletterForm;
