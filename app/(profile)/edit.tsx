import React, { useEffect, useState } from "react";
import ProfileContainer from "@/components/profile-container";
import ProfileHeader from "@/components/profile-header";
import ProfileAvatar from "@/components/profile-avatar";
import { Text, View } from "react-native";
import { Label } from "@/components/Label";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import ExitButton from "@/components/exit-button";
import { useLayoutContext } from "@/context/layout-context";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userEditSchema } from "@/schemas/user";
import Loading from "@/components/loading";
import z from "zod";
import { ErrorField } from "@/components/form-input-field";
import { useAreas } from "@/hooks/use-areas";
import { Select } from "@/components/select";
import Toast from "react-native-toast-message";
import { put } from "@/service/helpers";

const ProfileEdit = () => {
  const { currentUser } = useLayoutContext();

  const [hasChanges, setHasChanges] = useState(false);
  const {getCurrentUser} = useLayoutContext();
  const { areas } = useAreas();
  const [initialData, setInitialData] = useState({
    username: "",
    area_id: 0,
    email: "",
    phone_number: "",
  });

  const areaOptions = areas?.map((area) => ({
    label: area.name,
    value: String(area.id),
  }));

  useEffect(() => {
    if (currentUser) {
      setInitialData({
        username: currentUser?.username,
        area_id: currentUser?.area_id,
        email: currentUser?.email,
        phone_number: currentUser?.phone_number,
      });
    }
  }, [currentUser]);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(userEditSchema),
    defaultValues: {
      username: initialData.username,
      area_id: String(initialData.area_id),
      email: initialData.email,
      phone_number: initialData.phone_number,
    },
  });

  useEffect(() => {
    if (
      initialData.username !== currentUser?.username ||
      initialData.area_id !== currentUser?.area?.id ||
      initialData.email !== currentUser?.email ||
      initialData.phone_number !== currentUser?.phone_number
    ) {
      setHasChanges(true);
    }
  }, [initialData, currentUser]);

  const onSubmit = async (data: z.infer<typeof userEditSchema>) => {

    const changedFields = Object.keys(data).filter(
      //@ts-ignore
      (key) => data[key] === initialData[key]
    );
    

    const updatedData = changedFields.reduce((acc, key) => {
      //@ts-ignore
      acc[key] = data[key];
      return acc;
    }, {} as Record<string, any>);
    
    try {

      await put('/users', updatedData);
      Toast.show({
        type: 'success',
        text1: 'Dados atualizados com sucesso'
      })
      await getCurrentUser();
      
    } catch (error) {
      console.log('Erro ao dar update nos dados do usuário: ', error);
      Toast.show({
        type: 'error',
        text1: 'Erro ao dar update nos dados do usuário',
        text2: 'Tente novamente'
      })
    }
  };

  const onDataChange = (
    item: keyof z.infer<typeof userEditSchema>,
    value: string | number
  ) => {
    setInitialData((prev) => ({
      ...prev,
      [item]: value,
    }));
  };

  if (!currentUser || !areas) {
    return <Loading />;
  }

  return (
    <ProfileContainer>
      <ProfileHeader text="Dados do Perfil" />
      <ProfileAvatar horientation="column" />
      <View className="px-4 flex-1">
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <View className="py-2">
              <Label>Nome</Label>
              <Input
                onChangeText={(e) => {
                  field.onChange(e);
                  onDataChange("username", e);
                }}
                value={initialData.username}
                variant="outline"
              />
              <ErrorField error={errors.username?.message} />
            </View>
          )}
        />

        <Controller
          control={control}
          name="area_id"
          render={({ field }) => (
            <View className="py-2">
              <Label>Área</Label>
              <Select
                onChange={(item) => {
                  onDataChange("area_id", item.value);
                  field.onChange(item.value);
                }}
                data={areaOptions}
                value={String(initialData.area_id)}
                labelField={"label"}
                valueField={"value"}
              />
              <ErrorField error={errors.area_id?.message} />
            </View>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <View className="py-2">
              <Label>Email</Label>
              <Input
                value={initialData.email}
                onChangeText={(e) => {
                  field.onChange(e);
                  onDataChange("email", e);
                }}
                variant="outline"
              />
              <ErrorField error={errors.email?.message} />
            </View>
          )}
        />
        <Controller
          name="phone_number"
          control={control}
          render={({ field }) => (
            <View className="py-2">
              <Label>Telefone</Label>
              <Input
                value={initialData.phone_number}
                onChangeText={(e) => {
                  field.onChange(e);
                  onDataChange("phone_number", e);
                }}
                variant="outline"
              />
              <ErrorField error={errors.phone_number?.message} />
            </View>
          )}
        />
        <Button
          disabled={!hasChanges}
          onPress={handleSubmit(onSubmit)}
          className="mt-10  bg-blue-primary"
        >
          <Text className="text-lg font-semibold text-white">Salvar</Text>
        </Button>
        <View className="mt-auto">
          <ExitButton />
        </View>
      </View>
    </ProfileContainer>
  );
};

export default ProfileEdit;
