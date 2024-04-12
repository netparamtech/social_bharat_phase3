import { useEffect } from 'react';
import { useState } from 'react';
import { getUserFullProfile } from '../../../services/userService';
import UserLayout from '../../../layouts/UserLayout';
import UpdateMatrimonial from '../../../components/ProfilePage/UpdateMatrimonial';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../../actions/loaderAction';

const UpdateMatrimonialPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <UserLayout>
            <UpdateMatrimonial />
        </UserLayout>
    );
};

export default UpdateMatrimonialPage;