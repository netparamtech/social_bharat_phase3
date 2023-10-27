import { useNavigate } from "react-router-dom";
import HomeViewCms from "../../components/cms/HomeCmsView";
import AdminLayout from "../../layouts/AdminLayout";
import { useEffect, useState } from "react";
import { fetchSinglePageCMS } from "../../services/AdminService";

const HomeCmsViewPage = () => {
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
    return(
        <AdminLayout>
            <HomeViewCms homeCms = {homeCms} />
        </AdminLayout>
    );
}
export default HomeCmsViewPage;