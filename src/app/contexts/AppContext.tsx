"use client";
import { Registration } from "@prisma/client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import {
    createContext,
    PropsWithChildren,
    useState,
    useContext,
    Dispatch,
    SetStateAction,
} from "react";

interface AppContextType {
    registration?: Registration | null;
    setRegistration?: Dispatch<SetStateAction<Registration | null>>;
}

const AppContext = createContext<AppContextType>({});

interface AppContextProviderProps {
    session: Session | null;
    registration: Registration | null;
}

export const AppContextProvider = ({
    children,
    session,
    registration,
}: PropsWithChildren<AppContextProviderProps>) => {
    const [reg, setReg] = useState(registration);

    return (
        <AppContext.Provider value={{ registration: reg, setRegistration: setReg }}>
            <SessionProvider session={session}>{children}</SessionProvider>
        </AppContext.Provider>
    );
};

export const useStatus = () => {
    const statusContext = useContext(AppContext);
    if (!statusContext) {
        throw new Error("useStatus must be used within <StatusContext.Provider>");
    }
    return statusContext.registration?.status ?? "Not started";
};
