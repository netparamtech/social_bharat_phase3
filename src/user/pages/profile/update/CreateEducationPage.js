import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchAllActiveQualifications, getSingleEducationDetails } from '../../../services/userService';
import UserLayout from '../../../layouts/UserLayout';
import UpdateEducationProfile from '../../../components/ProfilePage/UpdateEducationProfile';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../../actions/loaderAction';
import CreateEducationProfile from '../../../components/ProfilePage/CreateEducationProfile';

const CreateEducationPage = () => {

        const { id } = useParams();
        const [educationDetails, setEducationDetails] = useState(null);

        const navigate = useNavigate();
        const dispatch = useDispatch();

        const fetchEducation = async (id) => {
                dispatch(setLoader(true));
                try {
                        const response = await getSingleEducationDetails(id);
                        if (response && response.status === 200) {
                                setEducationDetails(response.data.data);
                                dispatch(setLoader(false));
                        }
                } catch (error) {
                        dispatch(setLoader(false));
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
                        <CreateEducationProfile educationDetails={educationDetails} />
                </UserLayout>
        );
};

export default CreateEducationPage;