import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.scss";
import { AppContextProvider } from "./contexts/AppContext";
import { auth } from "@/auth";
import Theme from "./components/Theme";
import prisma from "@/prisma";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Dashboard | RythmHacks",
    description:
        "The dashboard for RythmHacks hackers, mentors, judges, and volunteers. Log in or sign up here to apply and view important info for the event!",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    console.log(session?.user);

    const registration = session?.user?.id
        ? await prisma.registration.findUnique({
              where: { id: session.user.id },
          })
        : null;

    return (
        <html lang="en">
            <body className={inter.className}>
                {/* <AuthProvider>
                    <StatusProvider>{children}</StatusProvider>
                </AuthProvider> */}
                <Theme />
                <AppContextProvider session={session} registration={registration}>
                    {children}
                </AppContextProvider>
            </body>
        </html>
    );
}
