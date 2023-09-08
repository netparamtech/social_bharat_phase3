import { useSelector } from "react-redux";
import AdminLayout from "../layouts/AdminLayout";
import ChangeProfile from "../components/ChangeProfile";

const ChangeProfilePage = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <AdminLayout>
            <ChangeProfile user = {user} />
        </AdminLayout>
    );
}

export default ChangeProfilePage;