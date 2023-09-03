import UserLayout from '../layouts/UserLayout';
import UpdateEducationProfile from '../components/ProfilePage/UpdateEducationProfile';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleEducationDetails } from '../services/userService';
import { useEffect, useState } from 'react';

const UpdateEducationPage = () => {

        const { id } = useParams();
        const [educationDetails, setEducationDetails] = useState(null);

        const navigate = useNavigate();

        const fetchEducation = async (id) => {
                try {
                        const response = await getSingleEducationDetails(id);
                        if (response && response.status === 200) {
                                setEducationDetails(response.data.data);
                        }
                } catch (error) {
                        //Unauthorized
                        if (error.response && error.response.status === 401) {
                                navigate('/login');
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
                        <UpdateEducationProfile educationDetails = {educationDetails} />
                </UserLayout>
        );
};

export default UpdateEducationPage;