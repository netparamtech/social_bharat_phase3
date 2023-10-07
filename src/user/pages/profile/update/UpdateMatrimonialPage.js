import { useEffect } from 'react';
import { useState } from 'react';
import { getUserFullProfile } from '../../../services/userService';
import UserLayout from '../../../layouts/UserLayout';
import UpdateMatrimonial from '../../../components/ProfilePage/UpdateMatrimonial';
import { useNavigate } from 'react-router-dom';

const UpdateMatrimonialPage = () => {

    const [userMatrimonial, setUserMatrimonial] = useState();
    const navigate = useNavigate();

    const getUserProfile = async () => {
        try {
            const response = await getUserFullProfile();
            if (response && response.status === 200) {
                setUserMatrimonial(response.data?.data?.matrimonial[0]);
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
        window.scrollTo(0, 0);
        getUserProfile(); // Call getUserProfile as well
    }, []);
    return (
        <UserLayout>
            <UpdateMatrimonial userMatrimonial={userMatrimonial} />
        </UserLayout>
    );
};

export default UpdateMatrimonialPage;