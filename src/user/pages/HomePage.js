import UserLayout from "../layouts/UserLayout";
import Banner from "../components/Banner";
import OurPartner from "../components/OurPartner";
import WhySocial from "../components/WhySocial";
import PromoteBusiness from "../components/PromoteBusiness";
import Services from "../components/Services";
import Matrimonial from "../components/Matrimonial";
import Testimonials from "../components/Testimonial";

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