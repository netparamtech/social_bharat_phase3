import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserFullProfile } from '../../../services/userService';
import { logout } from '../../../actions/userAction';
import UserLayout from '../../../layouts/UserLayout';
import UpdateMatrimonial from '../../../components/ProfilePage/UpdateMatrimonial';

const UpdateMatrimonialPage = () => {

    const [userMatrimonial, setUserMatrimonial] = useState();
    const dispatch = useDispatch();

    const getUserProfile = async () => {
        try {
            const response = await getUserFullProfile();
            if (response && response.status === 200) {
                setUserMatrimonial(response.data?.data?.matrimonial[0]);
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                dispatch(logout());
                window.location.href = '/login';
            } else if (error.response && error.response.status === 500) {
                dispatch(logout());
                window.location.href = '/login';
            }
        }
    }

    useEffect(() => {
        getUserProfile();
    }, [])
    return (
        <UserLayout>
            <UpdateMatrimonial userMatrimonial={userMatrimonial} />
        </UserLayout>
    );
};

export default UpdateMatrimonialPage;