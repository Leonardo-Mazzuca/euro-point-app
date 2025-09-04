import React from "react";
import ProfileContainer from "@/components/profile-container";
import ProfileHeader from "@/components/profile-header";
import { FlatList, RefreshControl, Text, View } from "react-native";
import AchievimentCard from "@/components/achieviment-card";
import { useLayoutContext } from "@/context/layout-context";
import { useAchieviments } from "@/hooks/use-achieviments";
import Loading from "@/components/loading";
import { Button } from "@/components/Button";
import { router } from "expo-router";
import Points from "@/components/points";

const Achieviments = () => {
  const { currentUser } = useLayoutContext();
  const { achieviments, isLoading, refetch, isRefetching } = useAchieviments();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ProfileContainer className="px-4">
      <ProfileHeader text="Minhas conquistas" />
      <View className="flex-1">
        <View className="flex-row gap-1 my-3 px-2 items-center">
          <Text className="dark:text-white text-xl font-semibold">
            Meus pontos
          </Text>
          <Points />
        </View>
        <Button
          className="rounded-2xl my-3 w-[200px] mx-auto"
          onPress={() => router.push("/(shop)")}
        >
          <Text className="text-white font-semibold">Usar meus pontos</Text>
        </Button>

        <FlatList
          className="mt-3 px-2"
          data={achieviments}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => <AchievimentCard achieviment={item} />}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
        />
      </View>
    </ProfileContainer>
  );
};

export default Achieviments;
