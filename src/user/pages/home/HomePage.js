import Banner from "../../components/home/Banner";
import Matrimonial from "../../components/home/Matrimonial";
import OurPartner from "../../components/home/OurPartner";
import PromoteBusiness from "../../components/home/PromoteBusiness";
import Services from "../../components/home/Services";
import Testimonials from "../../components/home/Testimonial";
import WhySocial from "../../components/home/WhySocial";
import UserLayout from "../../layouts/UserLayout";

const HomePage = () => {
    return (
        <>
            <UserLayout>
                <Banner />
                <OurPartner />
                <WhySocial />
                <PromoteBusiness />
                <Services />
                <Matrimonial />
                <Testimonials />
            </UserLayout>
        </>
    );
}

export default HomePage;