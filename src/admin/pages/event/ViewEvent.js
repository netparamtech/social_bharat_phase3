import { useNavigate, useParams } from "react-router-dom";
import BasicProfile from "../../components/users/profile/BasicProfile";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchUserDetailsByClick } from "../../services/AdminService";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ViewEventForm from "../../components/event/ViewEventForm";


const ViewEventPage = () => {
    const { id } = useParams();
    const [userDetails, setUserDetails] = useState(null);

    const navigate = useNavigate();

    const fetchUserFullProfile = async () => {
        try {
            const response = await fetchUserDetailsByClick(id);
            if (response && response.status === 200) {
                setUserDetails(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/login');
            } else if (error.response && error.response.status === 500) {
                navigate('/login');
            }
        }
    }
    useEffect(() => {
        fetchUserFullProfile();
    }, []);
    return (
        <AdminLayout>
            <BasicProfile userDetails={userDetails} />
           <ViewEventForm />
        </AdminLayout>
    );
}

export default ViewEventPage;