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
            //Unauthorized
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate('/login');
            } else if (error.response && error.response.status === 404) {
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                // navigate('/login');
            }
        } finally {
            dispatch(setLoader(false));
        }
    }

    useEffect(() => {
        getUserProfile();
        window.scrollTo(0, scrollValue ? parseInt(atob(scrollValue)) : 0);
    }, [])

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