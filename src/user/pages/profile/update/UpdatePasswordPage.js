import React, { useEffect } from 'react';
import UserLayout from '../../../layouts/UserLayout';
import UpdatePassword from '../../../components/ProfilePage/UpdatePassword';


const UpdatePasswordPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <UserLayout>
            <UpdatePassword />
        </UserLayout>

    );
};

export default UpdatePasswordPage;