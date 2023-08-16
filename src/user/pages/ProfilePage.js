import React from 'react';
import UserLayout from '../layouts/UserLayout';
import SideBar from '../components/ProfilePage/SideBar';
import BasicProfile from '../components/ProfilePage/BasicProfile';
import MatrimonialInfo from '../components/ProfilePage/MatrimonialInfo';
import EducationInfo from '../components/ProfilePage/EducationInfo';
import ContactInfo from '../components/ProfilePage/ContactInfo';
import BusinessInfo from '../components/ProfilePage/BusinessInfo';
import JobInfo from '../components/ProfilePage/JobInfo';


const ProfilePage = () => {
return (
        <UserLayout>
            <div id="profile-page-bg">
                <div className="container">
                    <div id="profile-page">
                        <div className="row">
                            {/* <SideBar /> */}
                            <div class="col-lg-9 col-md-8 mt-3 mx-auto">
                                <BasicProfile  />
                                <MatrimonialInfo />
                                <EducationInfo />
                                <ContactInfo />
                                <BusinessInfo />
                                <JobInfo />
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </UserLayout>
);
};

export default ProfilePage;