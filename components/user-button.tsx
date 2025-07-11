import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/Avatar";
import { router } from "expo-router";
import { useLayoutContext } from "@/context/layout-context";
import { getNameInitials } from "@/util";

const UserButton = () => {
  const { currentUser } = useLayoutContext();

  if(!currentUser){
    return <></>
  }

  //@ts-ignore
  const onPress = () => router.push("/(profile)");
  return (
    <TouchableOpacity onPress={onPress}>
      <Avatar className="h-14 w-14" alt="User image">
        <AvatarImage
          source={{
            uri: currentUser?.avatar,
          }}
        />
        <AvatarFallback>
          <Text className="dark:text-white font-semibold text-xl">
            {currentUser.username && getNameInitials(currentUser?.username)}
          </Text>
        </AvatarFallback>
      </Avatar>
    </TouchableOpacity>
  );
};

export default UserButton;
