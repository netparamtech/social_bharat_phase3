import { useNavigate, useParams } from "react-router-dom";
import BasicProfile from "../../components/users/profile/BasicProfile";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchUserDetailsByClick } from "../../services/AdminService";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import MatrimonialInfo from "../../components/users/profile/MatrimonialInfo";
import EducationInfo from "../../components/users/profile/EducationInfo";
import ContactInfo from "../../components/users/profile/ContactInfo";
import JobInfo from "../../components/users/profile/JobInfo";
import BusinessInfo from "../../components/users/profile/BusinessInfo";

const ViewUser = () => {
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
            <MatrimonialInfo userDetails = {userDetails} />
            <EducationInfo userDetails = {userDetails} />
            <ContactInfo userDetails = {userDetails} />
            <JobInfo userDetails = {userDetails} />
            <BusinessInfo userDetails = {userDetails} />
        </AdminLayout>
    );
}

export default ViewUser;