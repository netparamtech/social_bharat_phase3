import { useEffect, useState } from "react";
import UpdateBanner from "../../components/banners/UpdateBanner";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchBannerWithPageAndSection } from "../../services/AdminService";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBannerPage = () => {
    const { bannerPage, bannerSection } = useParams();
    const [banner, setBanner] = useState({});
    const navigate = useNavigate();
    const fetchBanner = async (page, section) => {
        try {
            const response = await fetchBannerWithPageAndSection(page, section);
            if (response && response.status === 200) {
                setBanner(response.data.data[0]);
            }
        } catch (error) {

            //Unauthorized
            if (error.response && error.response.status === 401) {
                navigate('/admin');
            }
        }
    }
    useEffect(()=>{
        fetchBanner(bannerPage,bannerSection);
    },[])
    return (
        <AdminLayout>
            <UpdateBanner banner = {banner} />
        </AdminLayout>
    );
}

export default UpdateBannerPage;