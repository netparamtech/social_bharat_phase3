import React from 'react';
import UserLayout from '../layouts/UserLayout';
import SideBar from '../components/ProfilePage/SideBar';
import UpdateMatrimonial from '../components/ProfilePage/UpdateMatrimonial';

const UpdateMatrimonialPage = () => {
    return (
        <UserLayout>
            <div id="profile-page-bg">
                <div className="container">
                    <div id="profile-page">
                        <div className="row">
                            {/* <SideBar /> */}
                            <div class="col-lg-9 col-md-8 mt-3 ms-auto">
                                <UpdateMatrimonial />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
};

export default UpdateMatrimonialPage;