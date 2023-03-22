import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../contexts/Auth";

import Sidebar from "../Sidebar/Sidebar";

const Dashboard = () => {
    const { user } = useAuth()
    return (<main className="flex">
        { user
            ? <>
                <Sidebar />
                <Outlet />
            </>
            : <>
                <div>You're not logged in! Click <Link to='/login'>here</Link> to be redirected to the login page.</div>
            </>
        }
    </main>)
}

export default Dashboard;