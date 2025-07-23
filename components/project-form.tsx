import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PostCreateType } from "@/schemas/post";
import FormInputField, { ErrorField } from "./form-input-field";
import ImageUploader from "./image-uploader";
import { Label } from "./Label";
import { useUsers } from "@/hooks/use-users";
import Loading from "./loading";
import { MultiSelect, Select } from "./select";
import { useTeams } from "@/hooks/use-teams";

const ProjectForm = () => {
  const {
    control,
    formState: { errors },
    setValue,
    setError,
    clearErrors
  } = useFormContext<PostCreateType>();

  const [image, setImage] = useState<string | null>(null);
  const [usersIds, setUsersIds] = useState<string[]>([]);
  const [teamId, setTeamId] = useState<string | null>("");
  const { teams } = useTeams();
  const { users, isLoading } = useUsers();

  const usersOptions = users?.map((u) => ({
    label: u.username,
    value: u.id,
  }));

  const teamsOptions = teams?.map((t) => ({
    label: t.name,
    value: String(t.id),
  }));


  useEffect(()=> {
    if(usersIds){
      //@ts-ignore
      setValue('project.members_ids', usersIds.map(item => parseInt(item)));
    }
  },[usersIds]);

  useEffect(()=> {
    if(teamId){
      setValue('project.team_id', Number(teamId));
    }
  },[teamId]);

  useEffect(()=> {
    if(image){
      setValue('project.image', image);
    }
  },[image]);

  useEffect(() => {
    console.log(image);
    
    if (!image) {
      setError('project', { message: 'Imagem obrigatória' });
    } else {
      clearErrors('project');
    }
  }, [image]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      <ImageUploader image={image} setImage={setImage as any} />
      <ErrorField error={errors.project?.image?.message} />
      <FormInputField
        control={control}
        name={"project.title"}
        label={"Título"}
        error={errors.project?.title?.message}
      />
      <FormInputField
        control={control}
        name={"project.content"}
        label={"Contéudo"}
        error={errors.project?.content?.message}
      />
      <Controller
        control={control}
        name="project.team_id"
        render={({ field }) => (
          <View className="mt-5">
            <Label>Time</Label>
            <Select
              onChange={(item) => {
                setTeamId(item.value);
                field.onChange(item.value);
              }}
              data={teamsOptions!}
              value={teamId}
              labelField={"label"}
              valueField={"value"}
            />
            <ErrorField error={errors.project?.team_id?.message} />
          </View>
        )}
      />
      <Controller
        control={control}
        name="project.members_ids"
        render={({ field }) => (
          <View className="mt-5">
            <Label>Membros</Label>
            <MultiSelect
              onChange={(item) => {
                setUsersIds(item);
                field.onChange(item);
              }}
              value={usersIds}
              data={usersOptions!}
              labelField={"label"}
              valueField={"value"}
            />
            <ErrorField 
              error={errors.project?.members_ids?.message}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ProjectForm;
