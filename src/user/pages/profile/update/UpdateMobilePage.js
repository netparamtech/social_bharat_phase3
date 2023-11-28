import { useEffect } from "react";
import UpdateMobile from "../../../components/ProfilePage/UpdateMobile";
import UserLayout from "../../../layouts/UserLayout";

const UpdateMobilePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <UserLayout>
            <UpdateMobile />
        </UserLayout>
    );
}

export default UpdateMobilePage;