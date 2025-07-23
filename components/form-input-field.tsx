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
};

const FormInputField = ({
  control,
  name,
  error,
  label,

}: FormInputFieldProps) => {
  return (
    <View className="mt-3">
      <Label>{label}</Label>

        <Controller
            control={control}
            name={name!}
            render={({ field }) => (
            <Input
                variant="line"
                onChangeText={(e) => field.onChange(e)}
                value={field.value}
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
