import Banner from "../components/Banner";
import Matrimonial from "../components/Matrimonial";
import OurPartner from "../components/OurPartner";
import PromoteBusiness from "../components/PromoteBusiness";
import Services from "../components/Services";
import Testimonials from "../components/Testimonial";
import WhySocial from "../components/WhySocial";
import UserLayout from "../layouts/UserLayout";

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