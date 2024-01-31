import { useEffect } from "react";
import CreateJobProfile from "../components/ProfilePage/CreateJobProfile";
import UserLayout from "../layouts/UserLayout";

const CreateJobProfilePage = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return(
        <UserLayout>
            <CreateJobProfile />
        </UserLayout>
    );
}
export default CreateJobProfilePage;