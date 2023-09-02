import UserList from "../../components/users/UserList";
import AdminLayout from "../../layouts/AdminLayout";

const UsersIndex = () => {
    return(
        <AdminLayout>
            <UserList />
        </AdminLayout>
    );
}

export default UsersIndex;