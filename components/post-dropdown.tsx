import { View, Text } from "react-native";
import React from "react";
import { Button } from "@/components/Button";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PostDropDown = () => {
  const triggerRef =
    React.useRef<React.ElementRef<typeof DropdownMenuTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <></>
  );
};

export default PostDropDown;
