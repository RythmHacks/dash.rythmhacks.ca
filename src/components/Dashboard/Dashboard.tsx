import React from 'react';
import { useAuth } from '../../contexts/Auth';

const Dashboard = () => {
    const { user } = useAuth();
   
    return (
        <div>
            <h1>Dashboard</h1>
            <p>{JSON.stringify(user)}</p>
        </div>
    )
}

export default Dashboard;