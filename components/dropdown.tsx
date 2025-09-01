import React, { useState } from "react";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import Feather from "@expo/vector-icons/Feather";
import { Dropdown as ElementDropdown } from "react-native-element-dropdown";
import { Colors } from "@/constants/Colors";
import { useLayoutContext } from "@/context/layout-context";

const DropDown = <T,>({
  placeholder = "selecione",
  variant = "default",
  showIcon = true,
  ...rest
}: DropdownProps<T> & { variant?: "default" | "ghost" , showIcon?: boolean}) => {
  const [isFocus, setIsFocus] = useState(false);
  const { theme } = useLayoutContext();

  const backgroundColor =
    theme === "dark" ? Colors.dark.neutralGray : Colors.light.neutralGray;
  const color = theme === "dark" ? "white" : "black";
  const borderRadius = 10;
  const isDark = theme === "dark";

  const getStyles = () => {
    switch (variant) {
      case "default":
        return {
          margin: 16,
          height: 50,
          backgroundColor,
          borderRadius,
          paddingHorizontal: 16,
          width: 150,
          marginLeft: "auto",
          borderColor: "transparent",
        };
      case "ghost":
        return {
          margin: 16,
          height: 50,
          borderRadius,
          paddingHorizontal: 16,
          width: 150,
          marginLeft: "auto",
          borderColor: "transparent",
        }
    }
  };

  return (
    <ElementDropdown
      {...rest}
      //@ts-ignore
      style={getStyles()}
      itemContainerStyle={{
        borderRadius,
      }}
      onFocus={() => setIsFocus(true)}
      containerStyle={{
        borderRadius,
        backgroundColor,
        shadowColor: "transparent",
        marginTop: 10,
        borderColor: "transparent",
      }}
      itemTextStyle={{
        color,
      }}
      selectedTextStyle={{
        color,
      }}
      placeholderStyle={{
        color: isDark ? "white" : "black",
      }}
      activeColor={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
      onBlur={() => setIsFocus(false)}
      maxHeight={300}
      placeholder={placeholder}
      renderRightIcon={() =>
        showIcon ? (
          !isFocus ? (
            <Feather color={color} name="chevron-down" size={20} />
          ) : (
            <Feather color={color} name="chevron-up" size={20} />
          )
        ) : null
      }
    />
  );
};

export default DropDown;
