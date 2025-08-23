import { createContext, useContext, useState } from "react";



type AuthState = {
    notShowSplashAgain: boolean
    setNotShowSplashAgain: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthState | null>(null);

const AuthProvider = ({children}:{children:React.ReactNode}) => {

    const [notShowSplashAgain, setNotShowSplashAgain] = useState(true);

    const value = {
        notShowSplashAgain,
        setNotShowSplashAgain
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuthContext must be used within a AuthProvider");
    }
    return context;
}

export {
    AuthProvider,
    useAuthContext
}