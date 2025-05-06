import React from "react";
import { Button } from "@/components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useLayoutContext } from "@/context/layout-context";
import { cn } from "@/lib/utils";

const PostButton = () => {
  const onPress = () => router.push("/post-screen");
  const {
    postButtonProps: { className, children, ...props },
  } = useLayoutContext();

  return (
    <Button
      onPress={onPress}
      size={"icon"}
      style={{ zIndex: 999 }}
      className={cn(
        "bg-blue-primary rounded-full w-[60px] h-[60px]",
        className
      )}
      {...props}
    >
      {children ? (
        children
      ) : (
        <AntDesign name="plus" size={28} color={Colors.light.primaryYeallow} />
      )}
    </Button>
  );
};

export default PostButton;
