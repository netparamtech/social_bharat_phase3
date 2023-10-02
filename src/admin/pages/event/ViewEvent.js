import { useNavigate, useParams } from "react-router-dom";
import BasicProfile from "../../components/users/profile/BasicProfile";
import AdminLayout from "../../layouts/AdminLayout";
import { fetchUserDetailsByClick } from "../../services/AdminService";
import { useEffect, useState } from "react";
import ViewEventForm from "../../components/event/ViewEventForm";


const ViewEventPage = () => {

    return (
        <AdminLayout>
           <ViewEventForm />
        </AdminLayout>
    );
}

export default ViewEventPage;