import { useEffect } from "react";
import Dashboard from "../components/dashboard/Dashboard";
import UserLayout from "../layouts/UserLayout";

const DashboardPage = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return (
        <UserLayout>
            <Dashboard />
        </UserLayout>
    );
};

export default DashboardPage;