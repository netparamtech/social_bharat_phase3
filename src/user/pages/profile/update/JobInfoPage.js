import { useNavigate } from "react-router-dom";
import UserLayout from "../../../layouts/UserLayout";
import { getUserFullProfile } from "../../../services/userService";
import { useEffect, useState } from "react";
import JobInfo from "../../../components/ProfilePage/JobInfo";

const JobInfoPage = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const getUserProfile = async () => {
        try {
            const response = await getUserFullProfile();
            if (response && response.status === 200) {
                setUser(response.data);
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
        getUserProfile();
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <UserLayout>
            <div>
                <JobInfo user={user} />
            </div>
        </UserLayout>
    );
}

export default JobInfoPage;