"use client";
import prisma from "@/prisma";
import { useSession } from "next-auth/react";
import { createContext, PropsWithChildren, useEffect, useState, useContext } from "react";

const StatusContext = createContext<string>("");

export const StatusProvider = ({ children }: PropsWithChildren<{}>) => {
    const [status, setStatus] = useState<string>("Not Started");
    const { data: session } = useSession();
    const user = session?.user;

    useEffect(() => {
        (async () => {
            console.log("used effect");
            setStatus(
                (
                    await prisma.registration.findUnique({
                        where: { id: user?.id },
                    })
                )?.status ?? "Not Started"
            );
        })();
    }, []);

    return <StatusContext.Provider value={status}>{children}</StatusContext.Provider>;
};

export const useStatus = () => {
    const statusContext = useContext(StatusContext);
    if (!statusContext) {
        throw new Error("useStatus must be used within <StatusContext.Provider>");
    }
    return statusContext;
};
