import React from 'react';
import UserLayout from '../layouts/UserLayout';
import DashboardIteam from '../components/DashboardIteam';
import Dashboard from '../components/Dashboard';


const DashboardPage = () => {
    return (
        <UserLayout>
            <Dashboard />
        </UserLayout>
    );
};

export default DashboardPage;