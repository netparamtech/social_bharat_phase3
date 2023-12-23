import { useNavigate } from "react-router-dom";
import { setLoader } from "../actions/loaderAction";
import WhySocial from "../components/home/WhySocial";
import UserLayout from "../layouts/UserLayout";
import { fetchSinglePageCMS } from "../services/userService";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Services from "../components/home/Services";

const OurSocialBharatProvidesPage = () => {
    const [homeCms, setHomeCms] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchCMS = async () => {
        dispatch(setLoader(true));
        try {
            const response = await fetchSinglePageCMS("home");
            if (response && response.status === 200) {
                setHomeCms(response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {

            }
        } finally {
            dispatch(setLoader(false));
        }
    }

    useEffect(() => {
        fetchCMS();
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (

        <UserLayout>
            <div id="auth-wrapper" className="pt-5 pb-4 container">
                <Services servicesCMS={homeCms && homeCms.services} />
            </div>
        </UserLayout>

    );
}
export default OurSocialBharatProvidesPage;