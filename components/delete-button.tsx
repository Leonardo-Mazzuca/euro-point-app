import React from "react";
import { Button, ButtonProps } from "@/components/Button";
import { FontAwesome5 } from "@expo/vector-icons";
import { useLayoutContext } from "@/context/layout-context";
import { Colors } from "@/constants/Colors";

type DeleteButtonProps = {
  handleDelete: () => void;
} & ButtonProps;

const DeleteButton = ({ handleDelete, ...rest }: DeleteButtonProps) => {
  const { theme } = useLayoutContext();

  return (
    <Button {...rest} onPress={handleDelete} variant={"ghost"}>
      <FontAwesome5
        name="trash"
        size={16}
        color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
      />
    </Button>
  );
};

export default DeleteButton;
