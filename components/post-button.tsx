import React from "react";
import { Button, ButtonProps } from "@/components/Button";
import { router } from "expo-router";
import { cn } from "@/lib/utils";
import PlusIcon from "./icons/plus";
import { Colors } from "@/constants/Colors";
import { useLayoutContext } from "@/context/layout-context";

export type PostButtonProps = {

} & ButtonProps

const PostButton = ({children,className,...rest}:PostButtonProps) => {
  const onPress = () => router.push("/post-screen");

  const {theme} = useLayoutContext();

  const isDark = theme === "dark";
  return (
    <Button
      onPress={onPress}
      size={"icon"}
      style={{ zIndex: 999 }}
      className={cn(
        "dark:bg-blue-primary bg-yeallow-primary rounded-full w-[60px] h-[60px]",
        className
      )}
      {...rest}
    >
      {children ? (
        children
      ) : (
        <PlusIcon color={isDark ? Colors.dark.primaryYeallow : Colors.light.primaryBlue} />
      )}
    </Button>
  );
};

export default PostButton;
