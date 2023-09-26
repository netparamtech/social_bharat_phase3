import { useEffect } from "react";
import UserLayout from "../layouts/UserLayout";
import EventForm from "../components/home/Event";

const EventPage = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return (
        <UserLayout>
            <EventForm />
        </UserLayout>
    );
};

export default EventPage;