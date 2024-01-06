import UserListWithCommunity from "../../components/users/UserListWithCommuniry";
import AdminLayout from "../../layouts/AdminLayout";

const usersWithCommunity = () => {
    return(
        <AdminLayout>
            <UserListWithCommunity />
        </AdminLayout>
    );
}

export default usersWithCommunity;