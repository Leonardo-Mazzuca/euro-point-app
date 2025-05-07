
import React, { useState } from "react";
import { DropdownProps } from "react-native-element-dropdown/lib/typescript/components/Dropdown/model";
import Feather from "@expo/vector-icons/Feather";
import { Dropdown as ElementDropdown } from 'react-native-element-dropdown';
import { Colors } from "@/constants/Colors";

const DropDown = <T,>({ ...rest }: DropdownProps<T>) => {

  const [isFocus, setIsFocus] = useState(false);

  return (
    <ElementDropdown
      {...rest}
      style={{
        margin: 16,
        height: 50,
        backgroundColor: Colors.light.neutralGray,
        borderRadius: 30,
        paddingHorizontal: 16,
        width: 150,
        marginLeft: "auto",
      }}
      onFocus={() => setIsFocus(true)}
      containerStyle={{
        borderRadius: 30,
        backgroundColor: Colors.light.neutralGray,
        shadowColor: 'transparent',
        marginTop: 10
      }}
      onBlur={() => setIsFocus(false)}
      maxHeight={300}
      placeholder="Selecione"
      renderRightIcon={() =>
        !isFocus ? (
          <Feather color={"black"} name="chevron-down" size={20} />
        ) : (
          <Feather color={"black"} name="chevron-up" size={20} />
        )
      }
    />
  );
};

export default DropDown;
