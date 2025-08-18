import { Button } from "@/components/Button";
import Container from "@/components/container";
import DropDown from "@/components/dropdown";
import NewsletterForm from "@/components/newsletter-form";
import PostForm from "@/components/post-form";
import ProjectForm from "@/components/project-form";
import { postTypeOptions } from "@/constants/data";
import { PostFormEnum, postSchema } from "@/schemas/post";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { Colors } from "@/constants/Colors";
import { useState } from "react";
import Sheet from "@/components/sheet";
import CloseButton from "@/components/close-button";
import { usePosts } from "@/hooks/use-posts";
import { useLayoutContext } from "@/context/layout-context";
import { useNewsletter } from "@/hooks/use-newsletter";
import { useProjects } from "@/hooks/use-projects";

const PostScreen = () => {

  const visibilities = ["my-area", "public"];
  const handleClose = () => router.back();
  const [openPublicChanger, setOpenPublicChanger] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const { newPost } = usePosts();
  const { newNewsletter } = useNewsletter();
  const { newProject } = useProjects();
  const { currentUser } = useLayoutContext();
  const [currentVisibility, setCurrentVisibility] = useState<string | null>(visibilities[0]);

  const formMethods = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      formType: PostFormEnum.post,
    },
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { isSubmitting },
  } = formMethods;

  const postType = watch("formType");

  const handleFormType = (value: PostFormEnum) => {
    setValue("formType", value);
  };

  const onSubmit = async () => {
    const {
      area: { id },
    } = currentUser;

    const data = getValues();
    switch (data.formType) {
      case PostFormEnum.newsletter:
        const newNewsletterStatus = await newNewsletter({
          ...data.newsletter,
          area_id: id,
        });
        if (newNewsletterStatus.success) {
          reset();
        }
        return;
      case PostFormEnum.project:
        const newPorjectStatus = await newProject({
          ...data.project,
          area_id: id,
        });
        if (newPorjectStatus.success) {
          reset();
        }
        return;
      case PostFormEnum.post:
        const newPostStatus = await newPost({ ...data.post, area_id: id });
        if (newPostStatus.success) {
          reset();
        }
        return;
    }
  };

  const SaveArea = () => {
    return (
      <View className="flex-row mt-10 w-full gap-2 justify-end items-center">
        <Button
          size="icon"
          variant="ghost"
          onPress={() => setOpenPublicChanger(true)}
          disabled={isPanning}
        >
          <FontAwesome6
            name="earth-americas"
            size={24}
            color={Colors.light.primaryBlue}
          />
        </Button>
        <Button size="icon" variant="ghost" onPress={() => {}}>
          <AntDesign
            name="clouduploado"
            size={24}
            color={Colors.light.primaryBlue}
          />
        </Button>
        <Button
          disabled={isSubmitting}
          className="w-[100px] bg-blue-primary"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-semibold">Salvar</Text>
        </Button>
      </View>
    );
  };

  return (
    <ScrollView className=" dark:bg-dark-primary">
      <Container className="flex-col">
        <View className="flex-row w-full items-center justify-between">
          <CloseButton handleClose={handleClose} />
          <View className="flex-1">
            <DropDown
              onChange={(item) => handleFormType(item.value as PostFormEnum)}
              data={postTypeOptions}
              value={postType}
              labelField="label"
              valueField="value"
              placeholder="Selecione"
            />
          </View>
        </View>

        <FormProvider {...formMethods}>
          <View className="mt-5 flex-1">
            {postType === "project" && <ProjectForm />}
            {postType === "newsletter" && <NewsletterForm />}
            {postType === "post" && <PostForm />}
            <SaveArea />
          </View>
        </FormProvider>

        {openPublicChanger && (
          <Sheet
            setIsPanning={setIsPanning}
            isPanning={isPanning}
            height={400}
            onClose={() => setOpenPublicChanger(false)}
          >
            <View className="p-3 gap-3 relative">
              <TouchableOpacity 
              onPress={() => setCurrentVisibility(visibilities[0])}
              className="flex-row items-center p-0 gap-2">
                <View className="relative">
                  {currentVisibility === visibilities[0] && <Dot />}
                  <FontAwesome6
                    name="earth-americas"
                    size={32}
                    color={Colors.dark.text}
                  />
                </View>
                <Text className="dark:text-white text-xl">
                  Público
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
              onPress={() => setCurrentVisibility(visibilities[1])}
              className="flex-row items-center gap-2">
                <View className="relative">
                  {currentVisibility === visibilities[1] && <Dot />}
                  <FontAwesome6
                    name="people-group"
                    size={32}
                    color={Colors.dark.text}
                  />
                </View>
                <Text className="dark:text-white text-xl">
                  Minha área
                </Text>
              </TouchableOpacity>
            </View>
          </Sheet>
        )}
      </Container>
    </ScrollView>
  );
};

const Dot = () => {
  return (
    <View className="w-3 z-50 h-3 absolute bottom-0 right-0 bg-green-400 rounded-full"></View>
  );
}

export default PostScreen;
