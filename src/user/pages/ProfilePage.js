import React, { useEffect, useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import BasicProfile from '../components/ProfilePage/BasicProfile';
import MatrimonialInfo from '../components/ProfilePage/MatrimonialInfo';
import EducationInfo from '../components/ProfilePage/EducationInfo';
import ContactInfo from '../components/ProfilePage/ContactInfo';
import BusinessInfo from '../components/ProfilePage/BusinessInfo';
import { getUserFullProfile } from '../services/userService';


const ProfilePage = () => {

    const [user, setUser] = useState();

    const getUserProfile = async () => {
        const response = await getUserFullProfile();
        if (response && response.status === 200) {
            setUser(response.data);
        }
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    return (
        <UserLayout>
            <BasicProfile />
            <MatrimonialInfo user={user} />
            <EducationInfo user={user} />
            <ContactInfo user={user} />
            <BusinessInfo user={user} />
           
        </UserLayout>
    );
};

export default ProfilePage;