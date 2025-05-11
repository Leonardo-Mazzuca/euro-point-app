
import React, { useState } from "react";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import Feather from "@expo/vector-icons/Feather";
import { Dropdown as ElementDropdown } from 'react-native-element-dropdown';
import { Colors } from "@/constants/Colors";
import { useLayoutContext } from "@/context/layout-context";

const DropDown = <T,>({ ...rest }: DropdownProps<T>) => {

  const [isFocus, setIsFocus] = useState(false);
  const {theme} = useLayoutContext();

  const backgroundColor = theme === "dark" ? Colors.dark.neutralGray : Colors.light.neutralGray;
  const color = theme === "dark" ? Colors.dark.text : Colors.light.text;
  const borderRadius = 10;

  return (
    <ElementDropdown
      {...rest}
      style={{
        margin: 16,
        height: 50,
        backgroundColor,
        borderRadius,
        paddingHorizontal: 16,
        width: 150,
        marginLeft: "auto",
        borderColor: "transparent",
      }}
      itemContainerStyle={{
        borderRadius,
      }}
      
      onFocus={() => setIsFocus(true)}
      containerStyle={{
        borderRadius,
        backgroundColor,
        shadowColor: 'transparent',
        marginTop: 10,
        borderColor: "transparent",
        
      }}
      itemTextStyle={{
        color, 
      }}
      selectedTextStyle={{
        color,
      }}
      activeColor={theme === "dark" ? Colors.dark.icon : Colors.light.icon}
      onBlur={() => setIsFocus(false)}
      maxHeight={300}
      placeholder="Selecione"
      renderRightIcon={() =>
        !isFocus ? (
          <Feather color={color} name="chevron-down" size={20} />
        ) : (
          <Feather color={color} name="chevron-up" size={20} />
        )
      }
    />
  );
};

export default DropDown;
