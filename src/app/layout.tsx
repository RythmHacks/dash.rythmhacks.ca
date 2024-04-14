import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/Auth";
import { StatusProvider } from "./contexts/UserStatus";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

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
            name: session.user.name,
            lastName: session.user.lastName,
            joinedDiscord: session.user.joinedDiscord,
            email: session.user.email,
            image: session.user.image,
        };
    }

    if (!localStorage.theme) {
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            localStorage.theme = "dark";
        } else if (
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: light)").matches
        ) {
            localStorage.theme = "light";
        } else {
            localStorage.theme = "dark";
        }
    }

    if (localStorage.theme === "dark" && !document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
    }
    if (localStorage.theme === "light" && !document.documentElement.classList.contains("light")) {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
    }

    return (
        <html lang="en">
            <body className={inter.className}>
                {/* <AuthProvider>
                    <StatusProvider>{children}</StatusProvider>
                </AuthProvider> */}
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    );
}
