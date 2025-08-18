import { useMessages } from "@/hooks/use-messages";
import { createContext } from "react";



type SocketState = {

}

const SocketContext = createContext<SocketState | undefined>(undefined);

const SocketProvider = ({ children }: any) => {

    useMessages();

    const value = {};

    return <SocketContext.Provider value={value}>
        {children}
    </SocketContext.Provider>;
};

export {
    SocketProvider
}