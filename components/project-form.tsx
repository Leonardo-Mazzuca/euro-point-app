import { View } from "react-native";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PostCreateType } from "@/schemas/post";
import FormInputField from "./form-input-field";
import ImageUploader from "./image-uploader";
import { Label } from "./Label";
import { useUsers } from "@/hooks/use-users";
import Loading from "./loading";
import { MultiSelect, Select } from "./select";
import { useProjects } from "@/hooks/use-projects";
import { useTeams } from "@/hooks/use-teams";

const ProjectForm = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext<PostCreateType>();

  const [image, setImage] = useState<string | null>(null);
  const [usersIds, setUsersIds] = useState<string[]>([]);
  const [teamId, setTeamId] = useState(0);
  const { newProject } = useProjects();
  const { teams } = useTeams();
  const { users, isLoading } = useUsers();

  const usersOptions = users?.map((u) => ({
    label: u.username,
    value: u.id,
  }));

  const teamsOptions = teams?.map((t) => ({
    label: t.name,
    value: t.id,
  }));

  const submit = async () => {
    
  }
  
  if (isLoading) {
    return <Loading />;
  }

  return (
    <View>
      <ImageUploader image={image} setImage={setImage as any} />
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
        name="project.team_id"
        render={({ field }) => (
          <View className="mt-5">
            <Label>Time</Label>
            <Select
              onChange={(item) => {
                setTeamId(item.value);
                field.onChange(item.value);
              }}
              value={teamId.toString()}
              data={teamsOptions!}
              labelField={"label"}
              valueField={"value"}
            />
          </View>
        )}
      />
      <Controller
        name="project.members_ids"
        render={({ field }) => (
          <View className="mt-5">
            <Label>Membros</Label>
            <MultiSelect
              onChange={(item) => setUsersIds(item)}
              value={usersIds}
              data={usersOptions!}
              labelField={"label"}
              valueField={"value"}
            />
          </View>
        )}
      />
    </View>
  );
};

export default ProjectForm;
