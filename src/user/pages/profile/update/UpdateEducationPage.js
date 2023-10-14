import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAllActiveQualifications, getSingleEducationDetails } from '../../../services/userService';
import UserLayout from '../../../layouts/UserLayout';
import UpdateEducationProfile from '../../../components/ProfilePage/UpdateEducationProfile';

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
                        //Internal Server Error
                        else if (error.response && error.response.status === 500) {
                                navigate('/login');
                        }
                }

        }

        useEffect(() => {
                if (id) {
                        fetchEducation(id);
                }
        }, [id]);

        useEffect(() => {
                window.scrollTo(0, 0);
        }, []);

        return (
                <UserLayout>
                        <UpdateEducationProfile educationDetails={educationDetails} />
                </UserLayout>
        );
};

export default UpdateEducationPage;