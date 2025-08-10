import { useRef } from "react";



export const useDoubleTap = ({fn}:{fn: () => void}) => {

    const lastTap = useRef<number | null>(null);
    const DOUBLE_TAP_DELAY = 300; 
    const onDoublePress = () => {
        const now = Date.now();
    
        if (lastTap.current && now - lastTap.current < DOUBLE_TAP_DELAY) {
          fn();
        }
    
        lastTap.current = now;
      };

      return {
        onDoublePress
      }
}