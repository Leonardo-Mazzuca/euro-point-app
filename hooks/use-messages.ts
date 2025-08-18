import { useLayoutContext } from "@/context/layout-context";
import { useEffect, useRef, useState } from "react";
import Toast from "react-native-toast-message";

type SocketMessage = {
  type: string;
  message?: string;
  [key: string]: any;
};

export const useMessages = () => {
  const [messages, setMessages] = useState<SocketMessage[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const {currentUser} = useLayoutContext();

  useEffect(() => {

    if(currentUser.id){
      const ws = new WebSocket(String(process.env.EXPO_PUBLIC_SOCKET_URL)); 
  
      wsRef.current = ws;
      
      ws.onopen = () => {
        console.log("✅ Conectado ao WebSocket");
  
        ws.send(
          JSON.stringify({
            type: "identify",
            id: currentUser.id,
          })
        );
      };
  
      ws.onmessage = (event) => {
        try {
          const data: SocketMessage = JSON.parse(event.data);
          console.log("📩 Mensagem recebida:", data);
          Toast.show({
              text1: "Conquista concluída!",
              text2: data.message,
              text2Style: { color: "black" },
              type: "success",
          })
  
          setMessages((prev) => [...prev, data]);
        } catch (err) {
          console.error("Erro ao parsear mensagem WS", err);
        }
      };
  
      ws.onclose = () => {
        console.log("❌ WebSocket desconectado");
      };
  
      ws.onerror = (err) => {
        console.error("⚠️ Erro no WebSocket", err);
      };
  
      return () => {
        ws.close();
      };
    }

  }, [currentUser]);


  return { messages };
};
