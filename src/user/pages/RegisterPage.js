import React, { useEffect } from 'react';
import UserLayout from '../layouts/UserLayout';
import RegisterForm from '../components/register/RegisterForm';

const RegisterPage = () => {
    
    useEffect(()=>{
        window.scroll(0,0);
    },[]);

    return (
        <UserLayout>
            <RegisterForm />
        </UserLayout>
        
        );
};

export default RegisterPage;