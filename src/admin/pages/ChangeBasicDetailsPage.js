import { useSelector } from "react-redux";
import AdminLayout from "../layouts/AdminLayout";
import ChangeProfilePicture from "../components/ChangeProfilePicture";
import ChangeBasicDetails from "../components/ChangeBasicDetails";

const ChangeBasicDetailsPage = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <AdminLayout>
            <ChangeBasicDetails user = {user} />
        </AdminLayout>
    );
}

export default ChangeBasicDetailsPage;