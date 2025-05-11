import React from "react";
import { Button, ButtonProps } from "@/components/Button";
import { Feather } from "@expo/vector-icons";
import { useLayoutContext } from "@/context/layout-context";
import { Colors } from "@/constants/Colors";

type BackButtonProps = {
  handleBack: () => void;
} & ButtonProps;

const BackButton = ({ handleBack, ...rest }: BackButtonProps) => {
  const { theme } = useLayoutContext();

  return (
    <Button
      {...rest}
      onPress={handleBack}
      className="me-auto"
      variant={"ghost"}
    >
      <Feather
        name="chevron-left"
        size={24}
        color={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
      />
    </Button>
  );
};

export default BackButton;
