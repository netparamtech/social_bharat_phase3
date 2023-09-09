import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getSingleEducationDetails } from '../../../services/userService';
import UserLayout from '../../../layouts/UserLayout';
import UpdateEducationProfile from '../../../components/ProfilePage/UpdateEducationProfile';
import { useDispatch } from 'react-redux';
import { logout } from '../../../actions/userAction';

const UpdateEducationPage = () => {

        const { id } = useParams();
        const [educationDetails, setEducationDetails] = useState(null);

        const dispatch = useDispatch();

        const fetchEducation = async (id) => {
                try {
                        const response = await getSingleEducationDetails(id);
                        if (response && response.status === 200) {
                                setEducationDetails(response.data.data);
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
                if (id) {
                        fetchEducation(id);
                }
        }, [id]);

        return (
                <UserLayout>
                        <UpdateEducationProfile educationDetails={educationDetails} />
                </UserLayout>
        );
};

export default UpdateEducationPage;