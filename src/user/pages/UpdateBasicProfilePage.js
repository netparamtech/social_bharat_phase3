import React from 'react';
import UserLayout from '../layouts/UserLayout';
import SideBar from '../components/ProfilePage/SideBar';
import UpdateBasicProfile from '../components/ProfilePage/UpdateBasicProfile';



const UpdateBasicProfilePage = () => {
return (
        <UserLayout>
            <div id="profile-page-bg">
                <div className="container">
                    <div id="profile-page">
                        <div className="row">
                            <SideBar />
                            <div class="col-lg-9 col-md-8 mt-3 ">
                                <UpdateBasicProfile />
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </UserLayout>
);
};

export default UpdateBasicProfilePage;