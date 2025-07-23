import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Dropdown, MultiSelect as ElementMultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLayoutContext } from '@/context/layout-context';
import { DropdownProps } from 'react-native-element-dropdown/lib/typescript/components/Dropdown/model';
import { MultiSelectProps } from 'react-native-element-dropdown/lib/typescript/components/MultiSelect/model';

type Props<T> = {

} & DropdownProps<T>

export const Select = <T,> ({...rest}:Props<T>) => {
  const [isFocus, setIsFocus] = useState(false);

  const {theme} = useLayoutContext();

  const isDark = theme === "dark";

  const styles = StyleSheet.create({
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      color: isDark ? 'white' : 'black'
    },
    selectedTextStyle: {
      fontSize: 16,
      color: isDark ? 'white' : 'black'
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    containerStyle: {

    }
  });

  const iconColor = isDark ? 'white': 'black';

  return (
    <View className='my-3 relative w-full'>
      <Dropdown
        {...rest}
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        containerStyle={styles.containerStyle}
        search
        onFocus={() => setIsFocus(true)}
        maxHeight={300}
        mode='modal'
        placeholder={!isFocus ? 'Selecionar..' : '...'}
        searchPlaceholder="Procurar..."
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={iconColor}
            name="Safety"
            size={20}
          />
        )}
        //@ts-ignore
        selectedTextProps={styles.selectedTextStyle}
      />
    </View>
  );
};


export const MultiSelect = <T,>({...rest}:MultiSelectProps<T>) => {

    const {theme} = useLayoutContext();

    const renderItem = (item:any,isSelected:any) => {
        return (
          <View style={styles.item}>
            <Text className={isSelected ? 'text-black' : 'text-zinc-500'} style={styles.selectedTextStyle}>{item.label}</Text>
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          </View>
        );
      };

    const isDark = theme === "dark";

    const styles = StyleSheet.create({
        container: { padding: 16 },
        dropdown: {
          height: 50,
          marginTop: 10,
          borderWidth: 1,
          borderColor: isDark ? 'gray' : 'black',
          borderRadius: 12,
          padding: 12,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
    
          elevation: 2,
        },
        placeholderStyle: {
          fontSize: 16,
          color: isDark ? 'white' : 'black'
        },
        selectedTextStyle: {
          fontSize: 14,
          color: isDark ? 'white' : 'black'
        },
        iconStyle: {
          width: 20,
          height: 20,
        },
        inputSearchStyle: {
          height: 40,
          fontSize: 16,
        },
        icon: {
          marginRight: 5,
        },
        item: {
          padding: 17,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        selectedStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 14,
          backgroundColor: isDark ? 'gray' : 'white',
          shadowColor: '#000',
          marginTop: 12,
          marginRight: 12,
          paddingHorizontal: 12,
          paddingVertical: 8,
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
    
          elevation: 2,
        },
        textSelectedStyle: {
          marginRight: 5,
          fontSize: 16,
          color: isDark ? 'white' : 'black'
        },
        containerStyle: {
            backgroundColor: isDark ? '#27272a' : 'white'
        },
        itemTextStyle: {
            color: isDark ? 'white' : 'black'
        },
        selectedItemStyle: {
            backgroundColor: isDark ? '#3f3f46' : '#f0f0f0',
        },
      });

    return (
        <ElementMultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            containerStyle={styles.containerStyle}
            itemTextStyle={styles.itemTextStyle}
            selectedTextStyle={styles.selectedTextStyle}
            selectedStyle={styles.selectedItemStyle}
            search
            placeholder='Selecione...'
            searchPlaceholder='Procurar...'
            mode='modal'
            renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                  <View style={styles.selectedStyle}>
                    <Text style={styles.textSelectedStyle}>{item.label}</Text>
                    <AntDesign color="black" name="delete" size={17} />
                  </View>
                </TouchableOpacity>
              )}
            renderItem={renderItem}

            {...rest}
        />
    )
}
