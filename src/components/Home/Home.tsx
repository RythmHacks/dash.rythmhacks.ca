import React from 'react';
import { useAuth } from '../../contexts/Auth';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome, {user!.email}!</p>
        </div>
    )
}

export default Dashboard;