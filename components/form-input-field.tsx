import { View, Text } from "react-native";
import React from "react";
import { Control, Controller } from "react-hook-form";
import { Label } from "./Label";
import { Input } from "./Input";

type FormInputFieldProps = {
  label: string;
  control: Control<any, any>;
  name?: string;
  error: string | undefined;
  children?: React.ReactNode;
  multiline?: boolean
  inputClass?:string
};

const FormInputField = ({
  control,
  name,
  error,
  label,
  multiline,
  inputClass
}: FormInputFieldProps) => {
  return (
    <View className="mt-3">
      <Label>{label}</Label>

        <Controller
            control={control}
            name={name!}
            render={({ field }) => (
              <Input
                  variant="default"
                  onChangeText={(e) => field.onChange(e)}
                  value={field.value}
                  multiline={multiline}
                  className={inputClass}
                  numberOfLines={multiline ? 4 : 1}
                  style={{height: multiline ? 100 : 40,textAlignVertical: 'top'}}
              />
            )}
        />

      <ErrorField error={error}/> 
    </View>
  );
};

export const ErrorField = ({error}:{error:string | undefined}) => {
  return (
   error && <Text className="text-red-500 text-sm mt-1">{error}</Text>
  )
}

export default FormInputField;
