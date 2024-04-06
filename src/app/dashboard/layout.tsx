import React from "react";
import { useAuth } from "../contexts/Auth";

import Navbar from "../components/Navbar/Navbar";
import Link from "next/link";

const Dashboard = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    return (
        <main className="flex">
            {user ? (
                <>
                    <Navbar />
                    {children}
                </>
            ) : (
                <>
                    <Navbar />
                    <div className="container h-min m-8">
                        <h1>Well darn</h1>
                        You're not logged in! Click{" "}
                        <Link href="/login">here</Link> to be redirected to the
                        login page.
                    </div>
                </>
            )}
        </main>
    );
};

export default Dashboard;
