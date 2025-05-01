import { createContext, PropsWithChildren, useContext, useState } from "react"

type LayoutState = {
    hidePostButton: boolean,
    setHidePostButton: (hidePostButton: boolean) => void,
    hideUI: boolean,
    setHideUI: (hideUI: boolean) => void,
}

const LayoutContext = createContext<LayoutState | undefined>(undefined);

const LayoutProvider = ({children}:PropsWithChildren) => {

    const [hidePostButton, setHidePostButton] = useState(false);
    const [hideUI, setHideUI] = useState(false);

    const value = {
        hidePostButton,
        setHidePostButton,
        hideUI,
        setHideUI
    }

    return (
        <LayoutContext.Provider value={value}>
            {children}
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