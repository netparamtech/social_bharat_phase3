import React, { useEffect, useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import BasicProfile from '../components/ProfilePage/BasicProfile';
import MatrimonialInfo from '../components/ProfilePage/MatrimonialInfo';
import EducationInfo from '../components/ProfilePage/EducationInfo';
import ContactInfo from '../components/ProfilePage/ContactInfo';
import BusinessInfo from '../components/ProfilePage/BusinessInfo';
import JobInfo from '../components/ProfilePage/JobInfo';
import { getUserFullProfile } from '../services/userService';


const ProfilePage = () => {

    const [user,setUser] = useState();

    const getUserProfile = async () => {
        const response = await getUserFullProfile();
        if (response && response.status === 200) {
           setUser(response.data);
        }
    }

    useEffect(()=>{
        getUserProfile();
    },[])

return (
        <UserLayout>
            <div id="profile-page-bg">
                <div className="container">
                    <div id="profile-page">
                        <div className="row">
                            {/* <SideBar /> */}
                            <div class="col-lg-9 col-md-8 mt-3 mx-auto">
                                <BasicProfile />
                                <MatrimonialInfo user = {user} />
                                <EducationInfo user = {user} />
                                <ContactInfo user = {user} />
                                <BusinessInfo user = {user} />
                                <JobInfo user = {user} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </UserLayout>
);
};

export default ProfilePage;