import React from 'react';
import UserLayout from '../layouts/UserLayout';
import SideBar from '../components/ProfilePage/SideBar';

const ProfilePage = () => {
    
        <UserLayout>
            <div id="profile-page-bg">
                <div className="container">
                    <div id="profile-page">
                        <div className="row">
                            <SideBar />
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    
};

export default ProfilePage;