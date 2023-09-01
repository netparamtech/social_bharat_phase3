import { useSelector } from "react-redux";
import ChangeProfileForm from "../components/ChangeProfileForm";
import AdminLayout from "../layouts/AdminLayout";

const ChangeProfilePage = () => {
    const user = useSelector((state) => state.auth.user);

    return (
        <AdminLayout>
            <ChangeProfileForm user = {user} />
        </AdminLayout>
    );
}

export default ChangeProfilePage;