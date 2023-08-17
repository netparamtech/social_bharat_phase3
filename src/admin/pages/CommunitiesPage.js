import AdminLayout from "../layouts/AdminLayout";
import CreateCommunityTable from "../components/CreateCommunitiesTable";

const CommunitiesPage = () => {
    return(
        <AdminLayout>
        <CreateCommunityTable />
        </AdminLayout>
    );
}

export default CommunitiesPage;