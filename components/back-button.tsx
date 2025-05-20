import React from "react";
import { Button, ButtonProps } from "@/components/Button";
import { Feather } from "@expo/vector-icons";
import { useLayoutContext } from "@/context/layout-context";
import { Colors } from "@/constants/Colors";

type BackButtonProps = {
  handleBack: () => void;
  iconSize?:number
} & ButtonProps;

const BackButton = ({ handleBack,iconSize = 24, ...rest }: BackButtonProps) => {
  const { theme } = useLayoutContext();

  return (
    <Button
      {...rest}
      onPress={handleBack}
      className="me-auto"
      variant={"ghost"}
      size={"icon"}
    >
      <Feather
        name="chevron-left"
        size={iconSize}
        color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
      />
    </Button>
  );
};

export default BackButton;
