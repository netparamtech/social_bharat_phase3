import React, { useEffect, useState } from 'react';
import UserLayout from '../../layouts/UserLayout';
import BasicProfile from '../../components/ProfilePage/BasicProfile';
import MatrimonialInfo from '../../components/ProfilePage/MatrimonialInfo';
import EducationInfo from '../../components/ProfilePage/EducationInfo';
import ContactInfo from '../../components/ProfilePage/ContactInfo';
import { getUserFullProfile } from '../../services/userService';
import JobInfo from '../../components/ProfilePage/JobInfo';
import BusinessInfo from '../../components/ProfilePage/BusinessInfo';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {

    const [user, setUser] = useState();
    const navigate = useNavigate();

    const getUserProfile = async () => {
        try {
            const response = await getUserFullProfile();
            if (response && response.status === 200) {
                setUser(response.data);
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                navigate('/login');
            }
        }
    }

    useEffect(() => {
        getUserProfile();
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <UserLayout>
            <BasicProfile user={user} />
            <MatrimonialInfo user={user} />
            <EducationInfo user={user} />
            <ContactInfo user={user} />
            <BusinessInfo user={user} />
            <JobInfo user={user} />
        </UserLayout>
    );
};

export default ProfilePage;