import { useLayoutContext } from "@/context/layout-context"
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";



export const useHideUi = () => {

 const {setHidePostButton,setHideUI} = useLayoutContext();

 useFocusEffect(
    useCallback(() => {
      setHidePostButton(true);
      setHideUI(true);
  
      return () => {
        setHidePostButton(false);
        setHideUI(false);
      };
    }, [])
  );

}