import { useEffect } from 'react';
import UserLayout from '../layouts/UserLayout';
import UpdateMatrimonial from '../components/ProfilePage/UpdateMatrimonial';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserFullProfile } from '../services/userService';
import { logout } from '../actions/userAction';

const UpdateMatrimonialPage = () => {

    const [userMatrimonial, setUserMatrimonial] = useState();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserProfile = async () => {
        try{
            const response = await getUserFullProfile();
        if (response && response.status === 200) {
            setUserMatrimonial(response.data?.data?.matrimonial[0]);
        }
        } catch (error) {
              //Unauthorized
              if (error.response && error.response.status === 401) {
                dispatch(logout());
                navigate('/login');
              }
        }
    }

    useEffect(() => {
        getUserProfile();
    }, [])
    return (
        <UserLayout>
             <UpdateMatrimonial userMatrimonial = {userMatrimonial} />
        </UserLayout>
    );
};

export default UpdateMatrimonialPage;