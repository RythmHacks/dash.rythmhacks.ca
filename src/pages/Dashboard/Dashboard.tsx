import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

import Navbar from "../../components/Navbar/Navbar";

const Dashboard = () => {
    const { user } = useAuth()
    return (<main className="flex">
        { user
            ? <>
                <Navbar />
                <Outlet />
            </>
            : <>
                <Navbar />
                <div className='container h-min m-8'>
                    <h1>Well darn</h1>
                    You're not logged in! Click <Link to='/login'>here</Link> to be redirected to the login page.
                </div>
            </>
        }
    </main>)
}

export default Dashboard;