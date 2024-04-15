import React from "react";

import Navbar from "../components/Navbar/Navbar";
import Link from "next/link";
import { auth } from "@/auth";

const Dashboard = async ({ children }: { children: React.ReactNode }) => {
    const session = await auth();
    return (
        <main className="flex">
            {session?.user ? (
                <>
                    <Navbar />
                    {children}
                </>
            ) : (
                <>
                    <Navbar />
                    <div className="container h-min m-8">
                        <h1>Well darn</h1>
                        You're not logged in! Click <Link href="/login">here</Link> to be redirected
                        to the login page.
                    </div>
                </>
            )}
        </main>
    );
};

export default Dashboard;
