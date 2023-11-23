import { useEffect } from 'react';
import { useState } from 'react';
import { getUserFullProfile } from '../../../services/userService';
import UserLayout from '../../../layouts/UserLayout';
import UpdateMatrimonial from '../../../components/ProfilePage/UpdateMatrimonial';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../../actions/loaderAction';

const UpdateMatrimonialPage = () => {

    const [userData, setUserData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const getUserProfile = async () => {
        dispatch(setLoader(true));
        try {
            const response = await getUserFullProfile();
            if (response && response.status === 200) {
                setUserData(response.data.data);
                console.log(response.data.data)
            }
        } catch (error) {
            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/login');
            }
            //Internal Server Error
            else if (error.response && error.response.status === 500) {
                //navigate('/login');
            }
        } finally {
            dispatch(setLoader(false));
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getUserProfile(); // Call getUserProfile as well
    }, []);
    return (
        <UserLayout>
            <UpdateMatrimonial userData={userData} />
        </UserLayout>
    );
};

export default UpdateMatrimonialPage;