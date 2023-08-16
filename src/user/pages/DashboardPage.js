import React from 'react';
import UserLayout from '../layouts/UserLayout';
import DashboardIteam from '../components/DashboardIteam';


const DashboardPage = () => {
    return (
        <UserLayout>

            <div id="profile-page-bg">
                <div className="container">
                    <div id="profile-page">
                        <div id="dashboard">
                                <div className="container">
                                    <div className="row">
                                        <DashboardIteam />
                                    </div>
                                </div>
                    
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default DashboardPage;