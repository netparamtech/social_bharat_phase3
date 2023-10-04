import React, { useEffect } from 'react';
import UserLayout from '../../../layouts/UserLayout';
import ChangePassword from '../../../components/ProfilePage/ChangePassword';


const ChangePasswordPage = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);
    return (
        <UserLayout>
            <ChangePassword />
        </UserLayout>
        
        );
};

export default ChangePasswordPage;