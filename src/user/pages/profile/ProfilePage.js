import React, { useEffect, useState } from 'react';
import UserLayout from '../../layouts/UserLayout';
import BasicProfile from '../../components/ProfilePage/BasicProfile';
import MatrimonialInfo from '../../components/ProfilePage/MatrimonialInfo';
import EducationInfo from '../../components/ProfilePage/EducationInfo';
import ContactInfo from '../../components/ProfilePage/ContactInfo';
import { getUserFullProfile } from '../../services/userService';
import JobInfo from '../../components/ProfilePage/JobInfo';
import BusinessInfo from '../../components/ProfilePage/BusinessInfo';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../actions/loaderAction';
import GenerateBiodata from '../../components/ProfilePage/GenerateBiodata';
import { logout } from '../../actions/userAction';

const ProfilePage = () => {
    const { scrollValue } = useParams();
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserProfile = async () => {
        dispatch(setLoader(true));
        try {
            const response = await getUserFullProfile();
            if (response && response.status === 200) {
                setUser(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate('/login');
            } else if (error.response && error.response.status === 404) {
                // Handle not found error
            } else if (error.response && error.response.status === 500) {
                // Handle internal server error
            }
        } finally {
            dispatch(setLoader(false));
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    useEffect(() => {
        if (scrollValue) {
            const sectionId = 'business-info';
            const scrollToSection = () => {
                const sectionElement = document.getElementById(sectionId);
                if (sectionElement) {
                    sectionElement.scrollIntoView({ behavior: 'smooth' });
                }
            };
            setTimeout(scrollToSection, 500); // Adjust the delay if necessary
        }
    }, [scrollValue]);

    return (
        <UserLayout>
            <BasicProfile user={user} />
            <MatrimonialInfo user={user} />
            <EducationInfo user={user} />
            <ContactInfo user={user} />
            <div id='business-info'>
                <BusinessInfo user={user} />
            </div>
            <JobInfo user={user} />
        </UserLayout>
    );
};

export default ProfilePage;
