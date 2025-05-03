import { useLayoutContext } from "@/context/layout-context";
import { useRef } from "react";
import { Animated } from "react-native";

type Props = {
    translateValue: Animated.Value
}

export const useScrollAnimation = ({translateValue}: Props) => {

    const uiOpacity = useRef(new Animated.Value(1)).current;
    const {setHideUI} = useLayoutContext();
  
    const uiTranslateY = useRef(translateValue).current;
    const currentOffset = useRef(0);
  
    const ANIMATION_DURATION = 200;
    const handleScroll = (event: any) => {
      const offsetY = event.nativeEvent.contentOffset.y;
      if (offsetY > currentOffset.current + 10) {
        Animated.timing(uiTranslateY, {
          toValue: -350, 
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }).start();
        setTimeout(()=> {
          setHideUI(true);
        },ANIMATION_DURATION);
      }
  
      if (offsetY < currentOffset.current - 10) {
        Animated.timing(uiTranslateY, {
          toValue: 0, 
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
        }).start();
        setTimeout(()=> {
          setHideUI(false);
        },ANIMATION_DURATION);
      }
  
      currentOffset.current = offsetY;
    };

    return {
        handleScroll,
        uiOpacity
    }
}