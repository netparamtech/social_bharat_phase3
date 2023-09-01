import { useSelector } from "react-redux";
import AdminLayout from "../layouts/AdminLayout";
import ChangeProfilePicture from "../components/ChangeProfilePicture";

const ChangeProfilePicturePage = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <AdminLayout>
            <ChangeProfilePicture user = {user} />
        </AdminLayout>
    );
}

export default ChangeProfilePicturePage;