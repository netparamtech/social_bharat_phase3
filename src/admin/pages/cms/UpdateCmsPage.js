import AdminLayout from "../../layouts/AdminLayout";
import Cms from "../../components/cms/Cms";
import { useEffect, useState } from "react";
import { fetchSinglePageCMS } from "../../services/AdminService";
import { useNavigate } from "react-router-dom";
import UpdateCms from "../../components/cms/UpdateCms";

const UpdateCmsPage = () => {
    const [homeCms, setHomeCms] = useState({});
    const navigate = useNavigate();
    const fetchCMS = async () => {
        try {
            const response = await fetchSinglePageCMS("home");
            if (response && response.status === 200) {
                setHomeCms(response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate("/admin");
            } else if (error.response && error.response.status === 500) {
                let errorMessage = error.response.data.message;
                navigate('/server/error', { state: { errorMessage } });
            }
        }
    }

    useEffect(() => {
        fetchCMS();
    }, []);
    return (
        <AdminLayout>
            <UpdateCms homeCms = {homeCms} />
        </AdminLayout>
    );
}

export default UpdateCmsPage;