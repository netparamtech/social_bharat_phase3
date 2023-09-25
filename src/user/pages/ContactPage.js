import { useEffect } from "react";
import Contact from "../components/home/Contact";
import UserLayout from "../layouts/UserLayout";

const ContactPage = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return (
        <UserLayout>
            <Contact />
        </UserLayout>
    );
};

export default ContactPage;