import AdminLayout from "../layouts/AdminLayout";
import UserList from "../components/UserList";

const UsersIndex = () => {
    return(
        <AdminLayout>
            <UserList />
        </AdminLayout>
    );
}

export default UsersIndex;