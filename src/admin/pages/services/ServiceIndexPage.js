import ServiceList from "../../components/services/ServiceList";
import AdminLayout from "../../layouts/AdminLayout";

const ServiceIndexPage = ()=> {
    return(
        <AdminLayout>
            <ServiceList />
        </AdminLayout>
    );
}

export default ServiceIndexPage;