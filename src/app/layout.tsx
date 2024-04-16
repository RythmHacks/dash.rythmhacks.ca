import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles.scss";
import { StatusProvider } from "./contexts/UserStatus";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import Theme from "./components/Theme";

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
    if (session?.user) {
        // don't allow sensitive data to make it to the client
        session.user = {
            id: session.user.id,
            name: session.user.name,
            lastName: session.user.lastName,
            joinedDiscord: session.user.joinedDiscord,
            email: session.user.email,
            image: session.user.image,
        };
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                {/* <AuthProvider>
                    <StatusProvider>{children}</StatusProvider>
                </AuthProvider> */}
                <Theme />
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    );
}
