import { ButtonProps } from "@/components/Button";
import { useColorScheme } from "nativewind";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { View } from "react-native";
import { themes } from "@/util/color-theme";

type Theme = 'dark' | 'light' | undefined
type LayoutState = {
    hidePostButton: boolean,
    setHidePostButton: (hidePostButton: boolean) => void,
    hideUI: boolean,
    setHideUI: (hideUI: boolean) => void,
    postButtonProps: ButtonProps
    setPostButtonProps: (props: ButtonProps) => void
    toggleTheme: () => void
    theme: Theme
    hideTabs: boolean
    setHideTabs: (hideTabs: boolean) => void
}

const LayoutContext = createContext<LayoutState | undefined>(undefined);

const LayoutProvider = ({children}:PropsWithChildren) => {

    const [hidePostButton, setHidePostButton] = useState(false);
    const [hideUI, setHideUI] = useState(false);
    const [postButtonProps, setPostButtonProps] = useState({} as ButtonProps);
    const [hideTabs, setHideTabs] = useState(false);
    const {colorScheme,setColorScheme} = useColorScheme()

    const toggleTheme = async () => {

        const newTheme = colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(newTheme);
        await AsyncStorage.setItem('theme', newTheme); 

    };

    useEffect(() => {
        const getTheme = async () => {
            const savedTheme = await AsyncStorage.getItem('theme');
            if (savedTheme) {
                setColorScheme(savedTheme as 'dark' | 'light'); 
            } else {
                setColorScheme(colorScheme as 'dark' | 'light');
            }
        };
        getTheme();
    }, []);

    const value = {
        hidePostButton,
        setHidePostButton,
        hideUI,
        setHideUI,
        postButtonProps,
        setPostButtonProps,
        theme: colorScheme,
        toggleTheme,
        hideTabs,
        setHideTabs
    }

    return (
        <LayoutContext.Provider value={value}>
            {/* @ts-ignore */}
            <View style={themes[colorScheme]} className="flex-1 dark">
                {children}
            </View>
        </LayoutContext.Provider>
    )
}

const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if(context === undefined) throw new Error('useLayoutContext must be used within a LayoutProvider');
    return context;
}

export {
    LayoutProvider,
    useLayoutContext
}