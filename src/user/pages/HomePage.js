import { useEffect } from "react";
import Banner from "../components/home/Banner";
import OurPartner from "../components/home/OurPartner";
import Services from "../components/home/Services";
import Testimonials from "../components/home/Testimonial";
import WhySocial from "../components/home/WhySocial";
import UserLayout from "../layouts/UserLayout";
import { useDispatch } from "react-redux";
import { setLoader } from "../actions/loaderAction";

const HomePage = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setLoader(false));
        window.scrollTo(0, 0);
    },[]);
    return (
        <>
        <div id="home">
            <UserLayout>
                <Banner />
                <OurPartner />
                <WhySocial />
                <section id="services">
                <Services />
                </section>
                <Testimonials />
            </UserLayout>
            </div>
        </>
    );
}

export default HomePage;