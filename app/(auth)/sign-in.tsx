import { View, Text } from "react-native";
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import { Controller } from "react-hook-form";

const SignIn = () => {
  const { formMethods, login } = useAuth();

  const onForgotPass = () => router.push("/(auth)/forgot-pass");

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  return (
    <View>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <View>
            <Label>Email</Label>
            <Input
              variant="outline"
              value={field.value}
              onChangeText={(e) => field.onChange(e)}
            />
            {errors.email && <Text className="text-red-500 mt-2">{errors.email.message}</Text>}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <View className="mt-5">
            <Label>Senha</Label>
            <Input 
              variant="outline"
              value={field.value}
              onChangeText={(e) => field.onChange(e)}
            />
            {errors.password && <Text className="text-red-500 mt-2">{errors.password.message}</Text>}
        </View>
        )}
      />

   
      <View className="my-2 ms-auto">
        <Button onPress={onForgotPass} className="px-2" variant={"ghost"}>
          <Text className="text-blue-primary dark:text-blue-secondary text-lg font-semibold">
            Esqueceu a senha?
          </Text>
        </Button>
      </View>

      <Button onPress={handleSubmit(login)} className="bg-blue-primary">
        <Text className="text-white font-semibold text-lg">Entrar</Text>
      </Button>
    </View>
  );
};

export default SignIn;
