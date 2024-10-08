import './css/navbar.css';
import './css/mainBanner.css';
import './css/ourPartner.css';
import './css/whySocial.css';
import { useEffect, useState } from "react";
import OurPartner from "../components/home/OurPartner";
import Services from "../components/home/Services";
import Testimonials from "../components/home/Testimonial";
import WhySocial from "../components/home/WhySocial";
import UserLayout from "../layouts/UserLayout";
import { useNavigate } from "react-router-dom";
import { fetchSinglePageCMS } from "../services/userService";
import { useDispatch } from "react-redux";
import CarousalBanner from '../components/home/CarousalBanner';

const HomePage = () => {

    const [homeCms, setHomeCms] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const fetchCMS = async () => {
        // dispatch(setLoader(true));
        try {
            const response = await fetchSinglePageCMS("home");
            if (response && response.status === 200) {
                setHomeCms(response.data.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {

            }
        } finally {
            // dispatch(setLoader(false));
        }
    }

    useEffect(() => {
        fetchCMS();
    }, []);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div id="home">
                <UserLayout>
                    {/* <Banner /> */}
                    <CarousalBanner />
                    <OurPartner />
                    <WhySocial aboutCMS={homeCms && homeCms.about} />
                    <section id="services">
                        <Services servicesCMS={homeCms && homeCms.services} />
                    </section>
                    <Testimonials />
                </UserLayout>
            </div>
        </>
    );
}

export default HomePage;